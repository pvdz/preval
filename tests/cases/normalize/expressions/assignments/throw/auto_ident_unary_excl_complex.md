# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Throw > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = !$(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:boolean*/ = !tmpUnaryArg;
throw a;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const a = !tmpUnaryArg;
throw a;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = !a;
throw b;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ false ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
