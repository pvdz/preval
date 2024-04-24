# Preval test case

# auto_ident_upd_im_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident upd im complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(b)).x--));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = $($(b)).x--;
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpCallCallee = $;
    const tmpCalleeParam = $(b);
    const tmpPostUpdArgObj = tmpCallCallee(tmpCalleeParam);
    const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
    const tmpAssignMemLhsObj = tmpPostUpdArgObj;
    const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
    tmpAssignMemLhsObj.x = tmpAssignMemRhs;
    const tmpNestedComplexRhs = tmpPostUpdArgVal;
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
$(100);
const b = { x: 1 };
const tmpCalleeParam = $(b);
const tmpPostUpdArgObj = $(tmpCalleeParam);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemRhs = tmpPostUpdArgVal - 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
let tmpSSA_a = tmpPostUpdArgVal;
let tmpSSA_tmpDoWhileFlag = tmpPostUpdArgVal;
if (tmpPostUpdArgVal) {
  $(100);
  const tmpCalleeParam$1 = $(b);
  const tmpPostUpdArgObj$1 = $(tmpCalleeParam$1);
  const tmpPostUpdArgVal$1 = tmpPostUpdArgObj$1.x;
  const tmpAssignMemRhs$1 = tmpPostUpdArgVal$1 - 1;
  tmpPostUpdArgObj$1.x = tmpAssignMemRhs$1;
  tmpSSA_a = tmpPostUpdArgVal$1;
  tmpSSA_tmpDoWhileFlag = tmpPostUpdArgVal$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$2 = $(b);
      const tmpPostUpdArgObj$2 = $(tmpCalleeParam$2);
      const tmpPostUpdArgVal$2 = tmpPostUpdArgObj$2.x;
      const tmpAssignMemRhs$2 = tmpPostUpdArgVal$2 - 1;
      tmpPostUpdArgObj$2.x = tmpAssignMemRhs$2;
      tmpSSA_a = tmpPostUpdArgVal$2;
      tmpSSA_tmpDoWhileFlag = tmpPostUpdArgVal$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d - 1;
c.x = e;
let f = d;
let g = d;
if (d) {
  $( 100 );
  const h = $( a );
  const i = $( h );
  const j = i.x;
  const k = j - 1;
  i.x = k;
  f = j;
  g = j;
  while ($LOOP_UNROLL_9) {
    if (g) {
      $( 100 );
      const l = $( a );
      const m = $( l );
      const n = m.x;
      const o = n - 1;
      m.x = o;
      f = n;
      g = n;
    }
    else {
      break;
    }
  }
}
$( f, a );
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
 - 7: 0, { x: '-1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
