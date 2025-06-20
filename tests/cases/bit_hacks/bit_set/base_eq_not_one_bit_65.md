# Preval test case

# base_eq_not_one_bit_65.md

> Bit hacks > Bit set > Base eq not one bit 65
>
> Specific pattern of checking if a bit is set. In this case multiple bits are set.

// The comparison is always false.

## Input

`````js filename=intro
const v = $(65);
const and = v & 64;
const set = and === 65;
if (set) {
  $('fail');
} else {
  $('pass');
}
`````


## Settled


`````js filename=intro
const v /*:unknown*/ = $(65);
v ** 0;
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(65) ** 0;
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 65 );
a ** 0;
$( "pass" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const v = $(65);
const and = v & 64;
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
 - 1: 65
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
