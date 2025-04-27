# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
export default a = b?.c(1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: $ };
const tmpChainElementCall /*:unknown*/ = $dotCall($, b, `c`, 1);
const tmpAnonDefaultExport /*:unknown*/ = tmpChainElementCall;
export { tmpAnonDefaultExport as default };
$(tmpChainElementCall);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $dotCall($, { c: $ }, `c`, 1);
const tmpAnonDefaultExport = tmpChainElementCall;
export { tmpAnonDefaultExport as default };
$(tmpChainElementCall);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: $ };
const b = $dotCall( $, a, "c", 1 );
const c = b;
export { c as default };
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
