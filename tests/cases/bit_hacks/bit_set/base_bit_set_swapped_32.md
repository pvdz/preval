# Preval test case

# base_bit_set_swapped_32.md

> Bit hacks > Bit set > Base bit set swapped 32
>
> Specific pattern of checking if a bit is set

## Input

`````js filename=intro
const v = $(32);
const and = 64 & v;
const set = and === 64;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````


## Settled


`````js filename=intro
const v /*:unknown*/ = $(32);
const and /*:number*/ = 64 & v;
if (and) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const v = $(32);
if (64 & v) {
  $(`fail`);
} else {
  $(`pass`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 32 );
const b = 64 & a;
if (b) {
  $( "fail" );
}
else {
  $( "pass" );
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
