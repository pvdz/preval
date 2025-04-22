# Preval test case

# regexp_constructor_no_args.md

> Regex > Constructor > Regexp constructor no args
>
> Edge case implemented to solve jsf*ck

## Input

`````js filename=intro
const y = RegExp();
$(y);
`````


## Settled


`````js filename=intro
const y /*:regex*/ = new $regex_constructor(`(?:)`, ``);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $regex_constructor(`(?:)`, ``));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "(?:)", "" );
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
