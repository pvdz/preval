# Preval test case

# zero_and_spy.md

> Bit hacks > And > Zero and spy
>
> And zero is always zero

## Input

`````js filename=intro
$(0 & $spy(0xffffffffffffffffffffffffffffffff));
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $spy(3.402823669209385e38);
tmpBinBothRhs ** 0;
$(0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$spy(3.402823669209385e38) ** 0;
$(0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 3.402823669209385e+38 );
a ** 0;
$( 0 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = 0;
const tmpBinBothRhs = $spy(3.402823669209385e38);
let tmpCalleeParam = tmpBinBothLhs & tmpBinBothRhs;
$(tmpCalleeParam);
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
