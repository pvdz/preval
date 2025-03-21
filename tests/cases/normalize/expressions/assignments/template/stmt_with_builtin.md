# Preval test case

# stmt_with_builtin.md

> Normalize > Expressions > Assignments > Template > Stmt with builtin
>
> A template that is a statement should be eliminated

## Input

`````js filename=intro
`f${String}oo`;
$(x);
`````


## Settled


`````js filename=intro
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
$( x );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
