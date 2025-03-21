# Preval test case

# base_checks_not_one_bit_65.md

> Bit hacks > Bit set > Base checks not one bit 65
>
> Specific pattern of checking if a bit is set. In this case multiple bits are set.

## Input

`````js filename=intro
const v = $(65);
const and = v & 65;
const set = and === 65;
if (set) {
  $('pass');
} else {
  $('fail');
}
`````


## Settled


`````js filename=intro
const v /*:unknown*/ = $(65);
const and /*:number*/ = v & 65;
const set /*:boolean*/ = and === 65;
if (set) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (($(65) & 65) === 65) {
  $(`pass`);
} else {
  $(`fail`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 65 );
const b = a & 65;
const c = b === 65;
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
 - 1: 65
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
