# Preval test case

# base_and_multi_bit_true.md

> If dual assign > And > Base and multi bit true
>
> A single bit AND means the result is one of two values and they are falsy and truthy so when it's the condition of an `if`, each branch knows the value.

## Input

`````js filename=intro
const x = $(33) & 33;
if (x) {
  $('pass', x);
} else {
  $('fail', x);
}
`````


## Settled


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $(33);
const x /*:number*/ = tmpBinLhs & 33;
if (x) {
  $(`pass`, x);
} else {
  $(`fail`, x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(33) & 33;
if (x) {
  $(`pass`, x);
} else {
  $(`fail`, x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 33 );
const b = a & 33;
if (b) {
  $( "pass", b );
}
else {
  $( "fail", b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinLhs = $(33);
const x = tmpBinLhs & 33;
if (x) {
  $(`pass`, x);
} else {
  $(`fail`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 33
 - 2: 'pass', 33
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
