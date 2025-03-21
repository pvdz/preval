# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Throw > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = "foo");
$(a);
`````


## Settled


`````js filename=intro
throw `foo`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw `foo`;
`````


## PST Settled
With rename=true

`````js filename=intro
throw "foo";
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ foo ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
