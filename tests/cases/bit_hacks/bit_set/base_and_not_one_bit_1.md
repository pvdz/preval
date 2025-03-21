# Preval test case

# base_and_not_one_bit_1.md

> Bit hacks > Bit set > Base and not one bit 1
>
> Specific pattern of checking if a bit is set. In this case multiple bits are set.

This should not do the trick.

## Input

`````js filename=intro
const v = $(1);
const and = v & 65;
const set = and === 64;
if (set) {
  $('pass');
} else {
  $('fail');
}
`````


## Settled


`````js filename=intro
const v /*:unknown*/ = $(1);
const and /*:number*/ = v & 65;
const set /*:boolean*/ = and === 64;
if (set) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (($(1) & 65) === 64) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a & 65;
const c = b === 64;
if (c) {
  $( "pass" );
}
else {
  $( "fail" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'fail'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
