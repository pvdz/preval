# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
throw (a = delete arg.y);
$(a, arg);
`````


## Settled


`````js filename=intro
throw true;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw true;
`````


## PST Settled
With rename=true

`````js filename=intro
throw true;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ true ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
