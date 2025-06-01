# Preval test case

# nullish_norm.md

> Ai > Ai5 > Nullish norm
>
> Test nullish coalescing normalization

## Input

`````js filename=intro
const x = $(null);
const y = $(2);
const result = x ?? y;
$(result);

// Expected:
// const x = $(null);
// const y = $(2);
// let result;
// if (x === null || x === undefined) {
//     result = y;
// } else {
//     result = x;
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(null);
const y /*:unknown*/ = $(2);
const tmpIfTest /*:boolean*/ = x == null;
if (tmpIfTest) {
  $(y);
} else {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(null);
const y = $(2);
if (x == null) {
  $(y);
} else {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( null );
const b = $( 2 );
const c = a == null;
if (c) {
  $( b );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(null);
const y = $(2);
let result = x;
const tmpIfTest = result == null;
if (tmpIfTest) {
  result = y;
  $(y);
} else {
  $(result);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: null
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
