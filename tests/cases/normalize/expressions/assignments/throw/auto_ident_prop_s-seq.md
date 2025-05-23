# Preval test case

# auto_ident_prop_s-seq.md

> Normalize > Expressions > Assignments > Throw > Auto ident prop s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
throw (a = (1, 2, b).c);
$(a, b);
`````


## Settled


`````js filename=intro
throw 1;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw 1;
`````


## PST Settled
With rename=true

`````js filename=intro
throw 1;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsProp = b;
a = tmpAssignRhsProp.c;
const tmpThrowArg = a;
throw tmpThrowArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
