# Preval test case

# single_bit_and_x_eq_x.md

> Bit hacks > And x if > And x if eq > Single bit and x eq x
>
> In some cases we can predict bitwise results or meta results

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
if (y === 32768) {
  $('pass');
} else {
  $('fail');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(32768);
const y /*:number*/ = x & 32768;
if (y) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(32768) & 32768) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 32768 );
const b = a & 32768;
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
const x = $(32768);
const y = x & 32768;
const tmpIfTest = y === 32768;
if (tmpIfTest) {
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
 - 1: 32768
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
