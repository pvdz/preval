# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = void $(100));
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
 - 1: 100
 - eval returned: ('<crash[ undefined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
