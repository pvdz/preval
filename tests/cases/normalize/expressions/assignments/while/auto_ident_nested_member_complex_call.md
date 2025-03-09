# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Assignments > While > Auto ident nested member complex call
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
while ((a = $(b)[$("x")] = $(c)[$("y")] = $(d))) $(100);
$(a, b, c, d);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
const c /*:object*/ = { y: 2 };
const varInitAssignLhsComputedObj /*:unknown*/ = $(c);
const varInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
const varInitAssignLhsComputedRhs /*:unknown*/ = $(3);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
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
    a = varInitAssignLhsComputedRhs$1;
    if (varInitAssignLhsComputedRhs$1) {
    } else {
      break;
    }
  }
  $(a, b, c, 3);
} else {
  $(varInitAssignLhsComputedRhs, b, c, 3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`x`);
const c = { y: 2 };
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedProp = $(`y`);
const varInitAssignLhsComputedRhs = $(3);
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = varInitAssignLhsComputedRhs;
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
    a = varInitAssignLhsComputedRhs$1;
    if (!varInitAssignLhsComputedRhs$1) {
      break;
    }
  }
  $(a, b, c, 3);
} else {
  $(varInitAssignLhsComputedRhs, b, c, 3);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
while ((a = $(b)[$(`x`)] = $(c)[$(`y`)] = $(d))) $(100);
$(a, b, c, d);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
while (true) {
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
    $(100);
  } else {
    break;
  }
}
$(a, b, c, d);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = $( "x" );
const e = { y: 2 };
const f = $( e );
const g = $( "y" );
const h = $( 3 );
f[g] = h;
c[d] = h;
if (h) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const i = $( b );
    const j = $( "x" );
    const k = $( e );
    const l = $( "y" );
    const m = $( 3 );
    k[l] = m;
    i[j] = m;
    a = m;
    if (m) {

    }
    else {
      break;
    }
  }
  $( a, b, e, 3 );
}
else {
  $( h, b, e, 3 );
}
`````

## Globals

None

## Runtime Outcome

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

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check