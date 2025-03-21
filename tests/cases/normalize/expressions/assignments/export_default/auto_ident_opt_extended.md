# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Export default > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
export default a = b?.x.y.z;
$(a);
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:number*/ = 100;
export { tmpAnonDefaultExport as default };
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = 100;
export { tmpAnonDefaultExport as default };
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 100;
export { a as default };
$( 100 );
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
