# Preval test case

# base_eq_not_one_bit_64.md

> Bit hacks > Bit set > Base eq not one bit 64
>
> Specific pattern of checking if a bit is set. In this case multiple bits are set.

## Input

`````js filename=intro
const v = $(64);
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
const v /*:unknown*/ = $(64);
v ** 0;
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(64) ** 0;
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 64 );
a ** 0;
$( "pass" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 64
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
