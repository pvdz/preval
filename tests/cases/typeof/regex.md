# Preval test case

# regex.md

> Typeof > Regex
>
> Inlining `typeof` when we know something is a literal

Regular expressions are objects. They do not have a special type, only special syntax.

## Input

`````js filename=intro
$(typeof /1/);
`````


## Settled


`````js filename=intro
$(`object`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`object`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "object" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
