# Preval test case

# base_checks_not_one_bit_32.md

> Bit hacks > Bit set > Base checks not one bit 32
>
> Specific pattern of checking if a bit is set. In this case multiple bits are set.

## Input

`````js filename=intro
const v = $(32);
const and = v & 65;
const set = and === 65;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````


## Settled


`````js filename=intro
const v /*:unknown*/ = $(32);
const and /*:number*/ = v & 65;
const set /*:boolean*/ = and === 65;
if (set) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (($(32) & 65) === 65) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 32 );
const b = a & 65;
const c = b === 65;
if (c) {
  $( "fail" );
}
else {
  $( "pass" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const v = $(32);
const and = v & 65;
const set = and === 65;
if (set) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 32
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
