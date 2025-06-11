# Preval test case

# precision_hack.md

> Math > Precision hack
>
> til

## Input

`````js filename=intro
var n = Number(0.005);
$(n);
$(n.toPrecision(100));
// 0.00500000000000000010408340855860842566471546888351440429687500000000...
`````


## Settled


`````js filename=intro
$(0.005);
$(`0.005000000000000000104083408558608425664715468883514404296875000000000000000000000000000000000000000000`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0.005);
$(`0.005000000000000000104083408558608425664715468883514404296875000000000000000000000000000000000000000000`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0.005 );
$( "0.005000000000000000104083408558608425664715468883514404296875000000000000000000000000000000000000000000" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let n = undefined;
n = $coerce(0.005, `number`);
$(n);
const tmpMCF = n.toPrecision;
let tmpCalleeParam = $dotCall(tmpMCF, n, `toPrecision`, 100);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.005
 - 2: '0.005000000000000000104083408558608425664715468883514404296875000000000000000000000000000000000000000000'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
