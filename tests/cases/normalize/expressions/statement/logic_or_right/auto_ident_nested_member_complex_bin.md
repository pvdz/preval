# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Statement > Logic or right > Auto ident nested member complex bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
$(100) || ($(b)[$("x")] = $(c)[$("y")] = d + e);
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { x: 1 };
const c /*:object*/ = { y: 2 };
if (tmpIfTest) {
  $(a, b, c, 3, 4);
} else {
  const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj /*:unknown*/ = $(c);
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 7;
  $(a, b, c, 3, 4);
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
  $(a, b, c, 3, 4);
} else {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedProp = $(`y`);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 7;
  $(a, b, c, 3, 4);
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
  $( b, c, d, 3, 4 );
}
else {
  const e = $( c );
  const f = $( "x" );
  const g = $( d );
  const h = $( "y" );
  g[h] = 7;
  e[f] = 7;
  $( b, c, d, 3, 4 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, { x: '1' }, { y: '2' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
