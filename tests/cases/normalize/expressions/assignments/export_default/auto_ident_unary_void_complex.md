# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Export default > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = void $(100);
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpAnonDefaultExport /*:undefined*/ = undefined;
export { tmpAnonDefaultExport as default };
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
const tmpAnonDefaultExport = undefined;
export { tmpAnonDefaultExport as default };
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = undefined;
export { a as default };
$( undefined );
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
