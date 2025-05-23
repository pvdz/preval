# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident unary void complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let a = void $(100);
$(a);
`````


## Settled


`````js filename=intro
$(100);
const a /*:undefined*/ = undefined;
export { a };
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const a = undefined;
export { a };
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = undefined;
export { a as a };
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(100);
let a = undefined;
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
