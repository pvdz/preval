# Preval test case

# stmt_implicit.md

> Normalize > Identifier > Stmt implicit
>
> Implicit global statement should not be eliminated

## Input

`````js filename=intro
foo;
`````


## Settled


`````js filename=intro
foo;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
foo;
`````


## PST Settled
With rename=true

`````js filename=intro
foo;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
foo;
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

foo


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
