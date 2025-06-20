# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident unary tilde complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = ~$(100);
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:number*/ = ~tmpUnaryArg;
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const a = ~tmpUnaryArg;
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = ~a;
export { b as a };
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = $(100);
let a = ~tmpUnaryArg;
export { a };
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
