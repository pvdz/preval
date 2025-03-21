# Preval test case

# regexp_constructor_one_string.md

> Regex > Constructor > Regexp constructor one string
>
> Edge case implemented to solve jsf*ck

## Input

`````js filename=intro
const y = RegExp(`x`);
$(y);
`````


## Settled


`````js filename=intro
const y /*:regex*/ = /x/;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(/x/);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = /x/;
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
