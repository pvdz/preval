# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Export default > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: { d: { e: $ } } };

let a = { a: 999, b: 1000 };
export default a = b?.c.d.e(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:object*/ = { e: $ };
const tmpClusterSSA_a /*:unknown*/ = $dotCall($, tmpObjLitVal$1, `e`, 1);
const tmpAnonDefaultExport /*:unknown*/ = tmpClusterSSA_a;
export { tmpAnonDefaultExport as default };
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $dotCall($, { e: $ }, `e`, 1);
const tmpAnonDefaultExport = tmpClusterSSA_a;
export { tmpAnonDefaultExport as default };
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { e: $ };
const b = $dotCall( $, a, "e", 1 );
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
