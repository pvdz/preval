# Preval test case

# single_bit_and_x_neq_y.md

> Bit hacks > And x if > And x if neq blocked > Single bit and x neq y
>
> In some cases we can predict bitwise results or meta results

## Input

`````js filename=intro
const x = $(32768);
const y = x & 32768;
$(y);
if (y !== 32) {
  $('pass');
} else {
  $('fail');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(32768);
const y /*:number*/ = x & 32768;
$(y);
$(`pass`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(32768) & 32768);
$(`pass`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 32768 );
const b = a & 32768;
$( b );
$( "pass" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 32768
 - 2: 32768
 - 3: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
