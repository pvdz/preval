# Preval test case

# minus_minus_ident.md

> Constants > Minus minus ident
>
> Double negative is positive. On a number that should have no observable side effects. On an ident that may trigger coercion.

## Input

`````js filename=intro
const x = $(5);
const y = -(-(x));
const z = y;
$(z); // Should be inlined to y, not -5
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(5);
const y /*:number*/ = +x;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(5);
$(+x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 5 );
const b = +a;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(5);
const y = +x;
const z = y;
$(y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
