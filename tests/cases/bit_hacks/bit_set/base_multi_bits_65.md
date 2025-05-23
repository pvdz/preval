# Preval test case

# base_multi_bits_65.md

> Bit hacks > Bit set > Base multi bits 65
>
> Specific pattern of checking if a bit is set. In this case multiple bits are set.

## Input

`````js filename=intro
const v = $(65);
const and = v & 64;
const set = and === 64;
if (set) {
  $('pass');
} else {
  $('fail');
}
`````


## Settled


`````js filename=intro
const v /*:unknown*/ = $(65);
const and /*:number*/ = v & 64;
if (and) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(65) & 64) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 65 );
const b = a & 64;
if (b) {
  $( "pass" );
}
else {
  $( "fail" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const v = $(65);
const and = v & 64;
const set = and === 64;
if (set) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 65
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
