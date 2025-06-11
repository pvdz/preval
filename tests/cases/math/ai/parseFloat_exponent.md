# Preval test case

# parseFloat_exponent.md

> Math > Ai > ParseFloat exponent
>
> parseFloat with exponent

## Input

`````js filename=intro
const a = $(parseFloat("1.23e4"));
$(a);
// Should be 12300
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(12300);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(12300));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 12300 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = 12300;
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 12300
 - 2: 12300
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
