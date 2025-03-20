# Preval test case

# zero_xor_spy.md

> Bit hacks > Xor > Zero xor spy
>
> Xor zero is always zero

## Input

`````js filename=intro
$(0 ^ $spy(0xffffffffffffffffffffffffffffffff));
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $spy(3.402823669209385e38);
const tmpCalleeParam /*:number*/ = 0 ^ tmpBinBothRhs;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $spy(3.402823669209385e38);
$(0 ^ tmpBinBothRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 3.402823669209385e+38 );
const b = 0 ^ a;
$( b );
`````


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
