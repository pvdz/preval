# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Statement > Throw > Auto ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
throw b;
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
let b = 1;
let a = { a: 999, b: 1000 };
throw b;
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
