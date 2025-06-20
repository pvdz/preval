# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident delete prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
throw delete arg.y;
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpThrowArg = delete arg.y;
throw tmpThrowArg;
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
