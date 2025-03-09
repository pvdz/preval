# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident nested member complex bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $(b)[$("x")] = $(c)[$("y")] = d + e));
$(a, b, c, d, e);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b, c, 3, 4);
} else {
  const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
  const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
  $(7);
  $(7, b, c, 3, 4);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const b = { x: 1 };
const c = { y: 2 };
if (tmpIfTest) {
  $($(100));
  $({ a: 999, b: 1000 }, b, c, 3, 4);
} else {
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedProp$1 = $(`y`);
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
  $(7);
  $(7, b, c, 3, 4);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $(b)[$(`x`)] = $(c)[$(`y`)] = d + e));
$(a, b, c, d, e);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a, b, c, d, e);
} else {
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedProp$1 = $(`y`);
  const varInitAssignLhsComputedRhs$1 = d + e;
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b, c, d, e);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = { x: 1 };
const c = { y: 2 };
if (a) {
  const d = $( 100 );
  $( d );
  const e = {
    a: 999,
    b: 1000,
  };
  $( e, b, c, 3, 4 );
}
else {
  const f = $( b );
  const g = $( "x" );
  const h = $( c );
  const i = $( "y" );
  h[i] = 7;
  f[g] = 7;
  $( 7 );
  $( 7, b, c, 3, 4 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: 7
 - 7: 7, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
