# Preval test case

# base.md

> Branch constants > Base
>
> When unknown values are conditionally known, we can at least inline them in that branch.

## Input

`````js filename=intro
const x = $(100);
if (x === 100) {
  $(x);
} else {
  $('nope');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
const tmpIfTest /*:boolean*/ = x === 100;
if (tmpIfTest) {
  $(100);
} else {
  $(`nope`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(100) === 100) {
  $(100);
} else {
  $(`nope`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = a === 100;
if (b) {
  $( 100 );
}
else {
  $( "nope" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
