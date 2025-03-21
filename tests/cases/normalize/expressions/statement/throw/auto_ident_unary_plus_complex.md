# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident unary plus complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw +$(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const tmpThrowArg /*:number*/ = +tmpUnaryArg;
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const tmpThrowArg = +tmpUnaryArg;
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = +a;
throw b;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ 100 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
