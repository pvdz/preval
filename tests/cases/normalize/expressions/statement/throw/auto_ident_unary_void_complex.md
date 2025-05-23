# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident unary void complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw void $(100);
$(a);
`````


## Settled


`````js filename=intro
$(100);
throw undefined;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
throw undefined;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
throw undefined;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
const tmpThrowArg = undefined;
throw tmpThrowArg;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ undefined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
