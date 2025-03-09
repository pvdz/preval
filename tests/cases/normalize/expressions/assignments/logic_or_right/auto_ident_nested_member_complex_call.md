# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident nested member complex call
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
$($(100) || (a = $(b)[$("x")] = $(c)[$("y")] = $(d)));
$(a, b, c, d);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b, c, 3);
} else {
  const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(c);
  const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
  const varInitAssignLhsComputedRhs$1 /*:unknown*/ = $(3);
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
  $(varInitAssignLhsComputedRhs$1);
  $(varInitAssignLhsComputedRhs$1, b, c, 3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
const b = { x: 1 };
const c = { y: 2 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, b, c, 3);
} else {
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(c);
  const varInitAssignLhsComputedProp$1 = $(`y`);
  const varInitAssignLhsComputedRhs$1 = $(3);
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
  $(varInitAssignLhsComputedRhs$1);
  $(varInitAssignLhsComputedRhs$1, b, c, 3);
}
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;
let a = { a: 999, b: 1000 };
$($(100) || (a = $(b)[$(`x`)] = $(c)[$(`y`)] = $(d)));
$(a, b, c, d);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a, b, c, d);
} else {
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
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b, c, d);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = { x: 1 };
const c = { y: 2 };
if (a) {
  $( a );
  const d = {
    a: 999,
    b: 1000,
  };
  $( d, b, c, 3 );
}
else {
  const e = $( b );
  const f = $( "x" );
  const g = $( c );
  const h = $( "y" );
  const i = $( 3 );
  g[h] = i;
  e[f] = i;
  $( i );
  $( i, b, c, 3 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, { x: '1' }, { y: '2' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
