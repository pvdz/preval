# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident unary tilde simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

export let a = ~arg;
$(a, arg);
`````


## Settled


`````js filename=intro
const a /*:number*/ /*truthy*/ = -2;
export { a };
$(-2, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = -2;
export { a };
$(-2, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = -2;
export { a as a };
$( -2, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = ~arg;
export { a };
$(a, arg);
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
