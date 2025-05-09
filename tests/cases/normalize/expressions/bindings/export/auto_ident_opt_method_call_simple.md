# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident opt method call simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

export let a = b?.c(1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const a /*:unknown*/ = $dotCall($, b, `c`, 1);
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $dotCall($, { c: $ }, `c`, 1);
export { a };
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, "c", 1 );
export { b as a };
$( b );
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
