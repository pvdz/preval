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
const y /*:regex*/ = new $regex_constructor(`x`, `g`);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $regex_constructor(`x`, `g`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "x", "g" );
$( a );
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
