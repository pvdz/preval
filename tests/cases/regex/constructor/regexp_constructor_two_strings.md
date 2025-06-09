# Preval test case

# regexp_constructor_two_strings.md

> Regex > Constructor > Regexp constructor two strings
>
> Edge case implemented to solve jsf*ck

## Input

`````js filename=intro
const y = RegExp(`x`, `g`);
$(y);
`````


## Settled


`````js filename=intro
const y /*:regex*/ /*truthy*/ = $regex_constructor(`x`, `g`);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($regex_constructor(`x`, `g`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $regex_constructor( "x", "g" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const y = $regex_constructor(`x`, `g`);
$(y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
