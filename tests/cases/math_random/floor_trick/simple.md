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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $Math_random;
const rnd = 0.12556649118791485;
const rnd62 = rnd * 62;
const tmpMCF$1 = $Math_floor;
const int62 = $Math_floor(rnd62);
const tmpMCF$3 = $string_charAt;
const chr = $dotCall($string_charAt, `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`, `charAt`, int62);
$(chr);
`````


## Todos triggered


None


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
