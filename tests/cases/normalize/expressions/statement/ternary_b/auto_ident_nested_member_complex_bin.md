# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Statement > Ternary b > Auto ident nested member complex bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
$(1) ? ($(b)[$("x")] = $(c)[$("y")] = d + e) : $(200);
$(a, b, c, d, e);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const b /*:object*/ /*truthy*/ = { x: 1 };
const c /*:object*/ /*truthy*/ = { y: 2 };
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
  const tmpAssignComMemLhsProp /*:unknown*/ = $(`x`);
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(c);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 7;
  $(a, b, c, 3, 4);
} else {
  $(200);
  $(a, b, c, 3, 4);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const tmpInitAssignLhsComputedObj = $(c);
  const tmpInitAssignLhsComputedProp = $(`y`);
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = 7;
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 7;
  $(a, b, c, 3, 4);
} else {
  $(200);
  $(a, b, c, 3, 4);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { x: 1 };
const c = { y: 2 };
const d = {
  a: 999,
  b: 1000,
};
if (a) {
  const e = $( b );
  const f = $( "x" );
  const g = $( c );
  const h = $( "y" );
  g[h] = 7;
  e[f] = 7;
  $( d, b, c, 3, 4 );
}
else {
  $( 200 );
  $( d, b, c, 3, 4 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpAssignComMemLhsObj = $(b);
  const tmpAssignComMemLhsProp = $(`x`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpInitAssignLhsComputedObj = $(c);
  const tmpInitAssignLhsComputedProp = $(`y`);
  const tmpInitAssignLhsComputedRhs = d + e;
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  const tmpAssignComputedRhs = tmpInitAssignLhsComputedRhs;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a, b, c, d, e);
} else {
  $(200);
  $(a, b, c, d, e);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 'x'
 - 4: { y: '2' }
 - 5: 'y'
 - 6: { a: '999', b: '1000' }, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
