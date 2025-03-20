# Preval test case

# string_lex.md

> Binary > Lt eq > String lex
>
> If two values compare to the same primitive value in code then we can freely replace them with true or false

## Input

`````js filename=intro
$('b' <= 'a');
`````


## Settled


`````js filename=intro
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
