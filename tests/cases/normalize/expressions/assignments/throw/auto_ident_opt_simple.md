# Preval test case

# auto_ident_opt_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident opt simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
throw (a = b?.x);
$(a);
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


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
