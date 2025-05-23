# Preval test case

# base_bit_set_0.md

> Bit hacks > Bit set > Base bit set 0
>
> Specific pattern of checking if a bit is set

## Input

`````js filename=intro
const v = $(0);
const and = v & 64;
const set = and === 64;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````


## Settled


`````js filename=intro
const v /*:unknown*/ = $(0);
const and /*:number*/ = v & 64;
if (and) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0) & 64) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = a & 64;
if (b) {
  $( "fail" );
}
else {
  $( "pass" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const v = $(0);
const and = v & 64;
const set = and === 64;
if (set) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
