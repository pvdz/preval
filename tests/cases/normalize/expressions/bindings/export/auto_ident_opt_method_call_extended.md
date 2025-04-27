# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Bindings > Export > Auto ident opt method call extended
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

export let a = b?.c.d.e(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpChainElementCall /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
const a /*:unknown*/ = tmpChainElementCall;
export { a };
$(tmpChainElementCall);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $dotCall($, { e: $ }, `e`, 1);
const a = tmpChainElementCall;
export { a };
$(tmpChainElementCall);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { e: $ };
const b = $dotCall( $, a, "e", 1 );
const c = b;
export { c as a };
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
