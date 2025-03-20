# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
export default a = void arg;
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:undefined*/ = undefined;
export { tmpAnonDefaultExport as default };
$(undefined, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = undefined;
export { tmpAnonDefaultExport as default };
$(undefined, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = undefined;
export { a as default };
$( undefined, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
