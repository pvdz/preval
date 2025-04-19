# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Statement > Logic or right > Auto ident nested member complex call
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
$(100) || ($(b)[$("x")] = $(c)[$("y")] = $(d));
$(a, b, c, d);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
if (tmpIfTest) {
  $(a, b, c, 3);
} else {
  const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(c);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
  const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(3);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpInitAssignLhsComputedRhs;
  $(a, b, c, 3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
const b = { x: 1 };
const c = { y: 2 };
if (tmpIfTest) {
  $(a, b, c, 3);
} else {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const tmpInitAssignLhsComputedObj = $(c);
  const tmpInitAssignLhsComputedProp = $(`y`);
  const tmpInitAssignLhsComputedRhs = $(3);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpInitAssignLhsComputedRhs;
  $(a, b, c, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
const c = { x: 1 };
const d = { y: 2 };
if (a) {
  $( b, c, d, 3 );
}
else {
  const e = $( c );
  const f = $( "x" );
  const g = $( d );
  const h = $( "y" );
  const i = $( 3 );
  g[h] = i;
  e[f] = i;
  $( b, c, d, 3 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, { x: '1' }, { y: '2' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
