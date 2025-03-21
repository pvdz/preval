# Preval test case

# spy_xor_zero.md

> Bit hacks > Xor > Spy xor zero
>
> Xor zero is always zero

## Input

`````js filename=intro
$($spy(0xffffffffffffffffffffffffffffffff) ^ 0);
`````


## Settled


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $spy(3.402823669209385e38);
const tmpCalleeParam /*:number*/ = tmpBinLhs ^ 0;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($spy(3.402823669209385e38) ^ 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 3.402823669209385e+38 );
const b = a ^ 0;
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [3.402823669209385e38, 3.402823669209385e38]
 - 2: '$spy[1].valueOf()', 3.402823669209385e38
 - 3: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
