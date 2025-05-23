# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Throw > Auto this
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = this);
$(a);
`````


## Settled


`````js filename=intro
throw undefined;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw undefined;
`````


## PST Settled
With rename=true

`````js filename=intro
throw undefined;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
const tmpThrowArg = a;
throw tmpThrowArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ undefined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
