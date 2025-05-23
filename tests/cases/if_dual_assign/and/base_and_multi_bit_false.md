# Preval test case

# base_and_multi_bit_false.md

> If dual assign > And > Base and multi bit false
>
> A single bit AND means the result is one of two values and they are falsy and truthy so when it's the condition of an `if`, each branch knows the value.

## Input

`````js filename=intro
const x = $(0) & 33;
if (x) {
  $('fail', x);
} else {
  $(`pass`, x);
}
`````


## Settled


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $(0);
const x /*:number*/ = tmpBinLhs & 33;
if (x) {
  $(`fail`, x);
} else {
  $(`pass`, x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(0) & 33;
if (x) {
  $(`fail`, x);
} else {
  $(`pass`, x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = a & 33;
if (b) {
  $( "fail", b );
}
else {
  $( "pass", b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinLhs = $(0);
const x = tmpBinLhs & 33;
if (x) {
  $(`fail`, x);
} else {
  $(`pass`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 'pass', 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
