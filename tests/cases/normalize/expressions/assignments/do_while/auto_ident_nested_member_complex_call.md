# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Assignments > Do while > Auto ident nested member complex call
>
> Normalization of assignments should work the same everywhere they are

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

## Settled


`````js filename=intro
$(100);
const b /*:object*/ = { x: 1 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(c);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
const varInitAssignLhsComputedRhs /*:unknown*/ = $(3);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
let tmpClusterSSA_a /*:unknown*/ = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpNestedAssignComMemberObj$1 /*:unknown*/ = $(b);
    const tmpNestedAssignComMemberProp$1 /*:unknown*/ = $(`x`);
    const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
    const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
    const varInitAssignLhsComputedRhs$1 /*:unknown*/ = $(3);
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = varInitAssignLhsComputedRhs$1;
    tmpClusterSSA_a = varInitAssignLhsComputedRhs$1;
    if (varInitAssignLhsComputedRhs$1) {
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, b, c, 3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const b = { x: 1 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const c = { y: 2 };
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedProp = $(`y`);
const varInitAssignLhsComputedRhs = $(3);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
let tmpClusterSSA_a = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  while (true) {
    $(100);
    const tmpNestedAssignComMemberObj$1 = $(b);
    const tmpNestedAssignComMemberProp$1 = $(`x`);
    const varInitAssignLhsComputedObj$1 = $(c);
    const varInitAssignLhsComputedProp$1 = $(`y`);
    const varInitAssignLhsComputedRhs$1 = $(3);
    varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
    tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = varInitAssignLhsComputedRhs$1;
    tmpClusterSSA_a = varInitAssignLhsComputedRhs$1;
    if (!varInitAssignLhsComputedRhs$1) {
      break;
    }
  }
}
$(tmpClusterSSA_a, b, c, 3);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $(b)[$(`x`)] = $(c)[$(`y`)] = $(d))) {
  } else {
    break;
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
while (true) {
  $(100);
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $(`x`);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  const varInitAssignLhsComputedRhs = $(d);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, c, d);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = { x: 1 };
const b = $( a );
const c = $( "x" );
const d = { y: 2 };
const e = $( d );
const f = $( "y" );
const g = $( 3 );
e[f] = g;
b[c] = g;
let h = g;
if (g) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const i = $( a );
    const j = $( "x" );
    const k = $( d );
    const l = $( "y" );
    const m = $( 3 );
    k[l] = m;
    i[j] = m;
    h = m;
    if (m) {

    }
    else {
      break;
    }
  }
}
$( h, a, d, 3 );
`````

## Globals

None

## Runtime Outcome

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

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check