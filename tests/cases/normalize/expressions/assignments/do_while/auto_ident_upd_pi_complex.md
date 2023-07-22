# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = ++$($(b)).x));
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
    tmpDoWhileFlag = a = ++$($(b)).x;
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
    const varInitAssignLhsComputedObj = tmpCallCallee(tmpCalleeParam);
    const tmpBinLhs = varInitAssignLhsComputedObj.x;
    const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
    varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
    const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
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
const varInitAssignLhsComputedObj = $(tmpCalleeParam);
const tmpBinLhs = varInitAssignLhsComputedObj.x;
const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let tmpClusterSSA_a = varInitAssignLhsComputedRhs;
let tmpClusterSSA_tmpDoWhileFlag = varInitAssignLhsComputedRhs;
let $tmpLoopUnrollCheck = true;
if (varInitAssignLhsComputedRhs) {
  $(100);
  const tmpCalleeParam$1 = $(b);
  const varInitAssignLhsComputedObj$1 = $(tmpCalleeParam$1);
  const tmpBinLhs$1 = varInitAssignLhsComputedObj$1.x;
  const varInitAssignLhsComputedRhs$1 = tmpBinLhs$1 + 1;
  varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$1;
  tmpClusterSSA_a = varInitAssignLhsComputedRhs$1;
  tmpClusterSSA_tmpDoWhileFlag = varInitAssignLhsComputedRhs$1;
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$2 = $(b);
      const varInitAssignLhsComputedObj$2 = $(tmpCalleeParam$2);
      const tmpBinLhs$2 = varInitAssignLhsComputedObj$2.x;
      const varInitAssignLhsComputedRhs$2 = tmpBinLhs$2 + 1;
      varInitAssignLhsComputedObj$2.x = varInitAssignLhsComputedRhs$2;
      tmpClusterSSA_a = varInitAssignLhsComputedRhs$2;
      tmpClusterSSA_tmpDoWhileFlag = varInitAssignLhsComputedRhs$2;
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
let f = e;
let g = e;
let h = true;
if (e) {
  $( 100 );
  const i = $( a );
  const j = $( i );
  const k = j.x;
  const l = k + 1;
  j.x = l;
  f = l;
  g = l;
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
      f = p;
      g = p;
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
