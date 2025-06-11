# Preval test case

# parseFloat_precision_loss.md

> Math > Ai > ParseFloat precision loss
>
> parseFloat with many decimals

## Input

`````js filename=intro
const a = $(parseFloat("0.12345678912345678"));
$(a);
// Should be 0.12345678912345678 (but may lose precision)
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(0.12345678912345678);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(0.12345678912345678));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0.12345678912345678 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 0.12345678912345678;
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0.12345678912345678
 - 2: 0.12345678912345678
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
