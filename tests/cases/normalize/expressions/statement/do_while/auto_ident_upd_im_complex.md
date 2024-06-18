# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident upd im complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(b)).x--);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ($($(b)).x--) {
  } else {
    break;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemLhsObj = tmpPostUpdArgObj;
  const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  const tmpIfTest = tmpPostUpdArgVal;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
$(100);
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
if (tmpPostUpdArgVal) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 = $(b);
    const tmpPostUpdArgObj$1 = $(tmpCalleeParam$1);
    const tmpPostUpdArgVal$1 = tmpPostUpdArgObj$1.x;
    const tmpAssignMemRhs$1 = tmpPostUpdArgVal$1 - 1;
    tmpPostUpdArgObj$1.x = tmpAssignMemRhs$1;
    if (tmpPostUpdArgVal$1) {
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
  a: 999,
  b: 1000,
};
$( 100 );
const c = $( a );
const d = $( c );
const e = d.x;
const f = e - 1;
d.x = f;
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const g = $( a );
    const h = $( g );
    const i = h.x;
    const j = i - 1;
    h.x = j;
    if (i) {

    }
    else {
      break;
    }
  }
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 100
 - 5: { x: '0' }
 - 6: { x: '0' }
 - 7: { a: '999', b: '1000' }, { x: '-1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
