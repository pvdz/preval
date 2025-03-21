# Preval test case

# base_and_single_bit_true.md

> If dual assign > And > Base and single bit true
>
> A single bit AND means the result is one of two values and they are falsy and truthy so when it's the condition of an `if`, each branch knows the value.

## Input

`````js filename=intro
const x = $(32) & 32;
if (x) {
  $('pass', x);
} else {
  $('fail', x);
}
`````


## Settled


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $(32);
const x /*:number*/ = tmpBinLhs & 32;
if (x) {
  $(`pass`, 32);
} else {
  $(`fail`, 0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(32) & 32) {
  $(`pass`, 32);
} else {
  $(`fail`, 0);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 32 );
const b = a & 32;
if (b) {
  $( "pass", 32 );
}
else {
  $( "fail", 0 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 32
 - 2: 'pass', 32
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
