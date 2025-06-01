# Preval test case

# shortcircuit_norm.md

> Ai > Ai5 > Shortcircuit norm
>
> Test short-circuit normalization

## Input

`````js filename=intro
const x = $(1);
const y = $(2);
const result = x && y;
$(result);

// Expected:
// const x = $(1);
// const y = $(2);
// let result;
// if (x) {
//     result = y;
// } else {
//     result = x;
// }
// $(result);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const y /*:unknown*/ = $(2);
if (x) {
  $(y);
} else {
  $(x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
const y = $(2);
if (x) {
  $(y);
} else {
  $(x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
if (a) {
  $( b );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(1);
const y = $(2);
let result = x;
if (result) {
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
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
