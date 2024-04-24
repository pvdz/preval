# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Assignments > Do while > Auto ident nested member complex call
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b)[$("x")] = $(c)[$("y")] = $(d)));
$(a, b, c, d);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = $(b)[$(`x`)] = $(c)[$(`y`)] = $(d);
  }
}
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const varInitAssignLhsComputedObj = $(b);
    const varInitAssignLhsComputedProp = $(`x`);
    const varInitAssignLhsComputedObj$1 = $(c);
    const varInitAssignLhsComputedProp$1 = $(`y`);
    const varInitAssignLhsComputedRhs$1 = $(d);
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
    const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
$(100);
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
const varInitAssignLhsComputedRhs$1 = $(3);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
let tmpSSA_a = varInitAssignLhsComputedRhs$1;
let tmpSSA_tmpDoWhileFlag = varInitAssignLhsComputedRhs$1;
if (varInitAssignLhsComputedRhs$1) {
  $(100);
  const varInitAssignLhsComputedObj$2 = $(b);
  const varInitAssignLhsComputedProp$2 = $(`x`);
  const varInitAssignLhsComputedObj$4 = $(c);
  const varInitAssignLhsComputedProp$4 = $(`y`);
  const varInitAssignLhsComputedRhs$2 = $(3);
  varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = varInitAssignLhsComputedRhs$2;
  varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$2;
  tmpSSA_a = varInitAssignLhsComputedRhs$2;
  tmpSSA_tmpDoWhileFlag = varInitAssignLhsComputedRhs$2;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      const varInitAssignLhsComputedObj$3 = $(b);
      const varInitAssignLhsComputedProp$3 = $(`x`);
      const varInitAssignLhsComputedObj$5 = $(c);
      const varInitAssignLhsComputedProp$5 = $(`y`);
      const varInitAssignLhsComputedRhs$3 = $(3);
      varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$3;
      varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
      tmpSSA_a = varInitAssignLhsComputedRhs$3;
      tmpSSA_tmpDoWhileFlag = varInitAssignLhsComputedRhs$3;
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a, b, c, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
$( 100 );
const c = $( a );
const d = $( "x" );
const e = $( b );
const f = $( "y" );
const g = $( 3 );
e[f] = g;
c[d] = g;
let h = g;
let i = g;
if (g) {
  $( 100 );
  const j = $( a );
  const k = $( "x" );
  const l = $( b );
  const m = $( "y" );
  const n = $( 3 );
  l[m] = n;
  j[k] = n;
  h = n;
  i = n;
  while ($LOOP_UNROLL_9) {
    if (i) {
      $( 100 );
      const o = $( a );
      const p = $( "x" );
      const q = $( b );
      const r = $( "y" );
      const s = $( 3 );
      q[r] = s;
      o[p] = s;
      h = s;
      i = s;
    }
    else {
      break;
    }
  }
}
$( h, a, b, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 3
 - 7: 100
 - 8: { x: '3' }
 - 9: 'x'
 - 10: { y: '3' }
 - 11: 'y'
 - 12: 3
 - 13: 100
 - 14: { x: '3' }
 - 15: 'x'
 - 16: { y: '3' }
 - 17: 'y'
 - 18: 3
 - 19: 100
 - 20: { x: '3' }
 - 21: 'x'
 - 22: { y: '3' }
 - 23: 'y'
 - 24: 3
 - 25: 100
 - 26: { x: '3' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
