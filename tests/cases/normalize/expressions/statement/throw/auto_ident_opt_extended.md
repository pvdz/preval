# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Statement > Throw > Auto ident opt extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
throw b?.x.y.z;
$(a);
`````


## Settled


`````js filename=intro
throw 100;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
throw 100;
`````


## PST Settled
With rename=true

`````js filename=intro
throw 100;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ 100 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
