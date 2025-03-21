# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident unary void simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
throw void arg;
$(a, arg);
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
