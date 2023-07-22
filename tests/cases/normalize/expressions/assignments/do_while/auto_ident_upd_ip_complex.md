# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident upd ip complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(b)).x++));
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
    tmpDoWhileFlag = a = $($(b)).x++;
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
    const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
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
const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
let tmpClusterSSA_a = tmpPostUpdArgVal;
let tmpClusterSSA_tmpDoWhileFlag = tmpPostUpdArgVal;
let $tmpLoopUnrollCheck = true;
if (tmpPostUpdArgVal) {
  $(100);
  const tmpCalleeParam$1 = $(b);
  const tmpPostUpdArgObj$1 = $(tmpCalleeParam$1);
  const tmpPostUpdArgVal$1 = tmpPostUpdArgObj$1.x;
  const tmpAssignMemRhs$1 = tmpPostUpdArgVal$1 + 1;
  tmpPostUpdArgObj$1.x = tmpAssignMemRhs$1;
  tmpClusterSSA_a = tmpPostUpdArgVal$1;
  tmpClusterSSA_tmpDoWhileFlag = tmpPostUpdArgVal$1;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$2 = $(b);
      const tmpPostUpdArgObj$2 = $(tmpCalleeParam$2);
      const tmpPostUpdArgVal$2 = tmpPostUpdArgObj$2.x;
      const tmpAssignMemRhs$2 = tmpPostUpdArgVal$2 + 1;
      tmpPostUpdArgObj$2.x = tmpAssignMemRhs$2;
      tmpClusterSSA_a = tmpPostUpdArgVal$2;
      tmpClusterSSA_tmpDoWhileFlag = tmpPostUpdArgVal$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d + 1;
c.x = e;
let f = d;
let g = d;
let h = true;
if (d) {
  $( 100 );
  const i = $( a );
  const j = $( i );
  const k = j.x;
  const l = k + 1;
  j.x = l;
  f = k;
  g = k;
}
else {
  h = false;
}
if (h) {
  while ($LOOP_UNROLL_9) {
    if (g) {
      $( 100 );
      const m = $( a );
      const n = $( m );
      const o = n.x;
      const p = o + 1;
      n.x = p;
      f = o;
      g = o;
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
 - 5: { x: '2' }
 - 6: { x: '2' }
 - 7: 100
 - 8: { x: '3' }
 - 9: { x: '3' }
 - 10: 100
 - 11: { x: '4' }
 - 12: { x: '4' }
 - 13: 100
 - 14: { x: '5' }
 - 15: { x: '5' }
 - 16: 100
 - 17: { x: '6' }
 - 18: { x: '6' }
 - 19: 100
 - 20: { x: '7' }
 - 21: { x: '7' }
 - 22: 100
 - 23: { x: '8' }
 - 24: { x: '8' }
 - 25: 100
 - 26: { x: '9' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
