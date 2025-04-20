# Preval test case

# call_number.md

> Builtins cases > Call number
>
> Check if builtin toplevel classes are changed into their symbols

## Input

`````js filename=intro
$('Number:', Number());
`````


## Settled


`````js filename=intro
$(`Number:`, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`Number:`, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "Number:", 0 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Number:', 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
