# Preval test case

# spy_and_zero.md

> Bit hacks > And > Spy and zero
>
> And zero is always zero

## Input

`````js filename=intro
$($spy(0xffffffffffffffffffffffffffffffff) & 0);
`````

## Settled


`````js filename=intro
const tmpBinLhs /*:unknown*/ = $spy(3.402823669209385e38);
tmpBinLhs ** 0;
$(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$spy(3.402823669209385e38) ** 0;
$(0);
`````

## Pre Normal


`````js filename=intro
$($spy(3.402823669209385e38) & 0);
`````

## Normalized


`````js filename=intro
const tmpBinLhs = $spy(3.402823669209385e38);
tmpBinLhs & 0;
const tmpCalleeParam = 0;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy( 3.402823669209385e+38 );
a ** 0;
$( 0 );
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
