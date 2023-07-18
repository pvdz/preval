# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Statement > While > Auto ident nested member complex call
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
while (($(b)[$("x")] = $(c)[$("y")] = $(d))) $(100);
$(a, b, c, d);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
while (($(b)[$(`x`)] = $(c)[$(`y`)] = $(d))) $(100);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
while (true) {
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedProp$1 = $(`y`);
  const varInitAssignLhsComputedRhs$1 = $(d);
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpIfTest = varInitAssignLhsComputedRhs;
  if (tmpIfTest) {
    $(100);
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
const a = { a: 999, b: 1000 };
let $tmpLoopUnrollCheck = true;
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
const varInitAssignLhsComputedRhs$1 = $(3);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
if (varInitAssignLhsComputedRhs$1) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const varInitAssignLhsComputedObj$2 = $(b);
    const varInitAssignLhsComputedProp$2 = $(`x`);
    const varInitAssignLhsComputedObj$4 = $(c);
    const varInitAssignLhsComputedProp$4 = $(`y`);
    const varInitAssignLhsComputedRhs$2 = $(3);
    varInitAssignLhsComputedObj$4[varInitAssignLhsComputedProp$4] = varInitAssignLhsComputedRhs$2;
    varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$2;
    if (varInitAssignLhsComputedRhs$2) {
      $(100);
    } else {
      break;
    }
  }
} else {
}
$(a, b, c, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
const c = {
a: 999,
b: 1000
;
let d = true;
const e = $( a );
const f = $( "x" );
const g = $( b );
const h = $( "y" );
const i = $( 3 );
g[h] = i;
e[f] = i;
if (i) {
  $( 100 );
}
else {
  d = false;
}
if (d) {
  while ($LOOP_UNROLL_10) {
    const j = $( a );
    const k = $( "x" );
    const l = $( b );
    const m = $( "y" );
    const n = $( 3 );
    l[m] = n;
    j[k] = n;
    if (n) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
$( c, a, b, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 3
 - 6: 100
 - 7: { x: '3' }
 - 8: 'x'
 - 9: { y: '3' }
 - 10: 'y'
 - 11: 3
 - 12: 100
 - 13: { x: '3' }
 - 14: 'x'
 - 15: { y: '3' }
 - 16: 'y'
 - 17: 3
 - 18: 100
 - 19: { x: '3' }
 - 20: 'x'
 - 21: { y: '3' }
 - 22: 'y'
 - 23: 3
 - 24: 100
 - 25: { x: '3' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
