# Preval test case

# simple.md

> Math random > Floor trick > Simple
>
>

## Input

`````js filename=intro
const rnd = Math.random();
const rnd62 = rnd * 62;
const int62 = Math.floor(rnd62);
const chr = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(int62);
$(chr);
`````


## Settled


`````js filename=intro
$(`H`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`H`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "H" );
`````


## Todos triggered


- type trackeed tricks can possibly support resolving the type for calling this builtin static symbol: $Math_floor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'H'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
