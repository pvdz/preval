# Preval test case

# sub_alias.md

> Let aliases > V2 > Sub alias
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmp = $(100);
if (tmp) {
  b = $(2);
  const alias = b; // This is a redundant alias that we can eliminate
  a = b;
  $(alias);
} else {
  $(tmp);
}
$(a, b);
`````


## Settled


`````js filename=intro
const tmp /*:unknown*/ = $(100);
if (tmp) {
  const b /*:unknown*/ = $(2);
  $(b);
  $(b, b);
} else {
  $(tmp);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmp = $(100);
if (tmp) {
  const b = $(2);
  $(b);
  $(b, b);
} else {
  $(tmp);
  $({ a: 999, b: 1000 }, 1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = $( 2 );
  $( b );
  $( b, b );
}
else {
  $( a );
  const c = {
    a: 999,
    b: 1000,
  };
  $( c, 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmp = $(100);
if (tmp) {
  b = $(2);
  const alias = b;
  a = b;
  $(alias);
  $(a, b);
} else {
  $(tmp);
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: 2
 - 4: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
