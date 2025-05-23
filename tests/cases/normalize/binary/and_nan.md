# Preval test case

# and_nan.md

> Normalize > Binary > And nan
>
> Bitwise ops coerce their arg

## Input

`````js filename=intro
const a = $(100);
const b = a | NaN; // This should normalize to 0 and then be eliminated
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(100);
a ** 0;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(100);
a ** 0;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
a ** 0;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(100);
const b = a | 0;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
