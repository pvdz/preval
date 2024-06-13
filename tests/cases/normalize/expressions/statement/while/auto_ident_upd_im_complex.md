# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Statement > While > Auto ident upd im complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while ($($(b)).x--) $(100);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while ($($(b)).x--) $(100);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(b);
  const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
  const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
  const tmpAssignMemLhsObj = tmpPostUpdArgObj;
  const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
  const tmpIfTest = tmpPostUpdArgVal;
  if (tmpIfTest) {
    $(100);
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
let $tmpLoopUnrollCheck = true;
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
if (tmpPostUpdArgVal) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCalleeParam$1 = $(b);
    const tmpPostUpdArgObj$1 = $(tmpCalleeParam$1);
    const tmpPostUpdArgVal$1 = tmpPostUpdArgObj$1.x;
    const tmpAssignMemRhs$1 = tmpPostUpdArgVal$1 - 1;
    tmpPostUpdArgObj$1.x = tmpAssignMemRhs$1;
    if (tmpPostUpdArgVal$1) {
      $(100);
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
let c = true;
const d = $( a );
const e = $( d );
const f = e.x;
const g = f - 1;
e.x = g;
if (f) {
  $( 100 );
}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    const h = $( a );
    const i = $( h );
    const j = i.x;
    const k = j - 1;
    i.x = k;
    if (j) {
      $( 100 );
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
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 100
 - 4: { x: '0' }
 - 5: { x: '0' }
 - 6: { a: '999', b: '1000' }, { x: '-1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
