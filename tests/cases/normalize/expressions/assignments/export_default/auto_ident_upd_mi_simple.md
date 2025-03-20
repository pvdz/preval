# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default a = --b;
$(a, b);
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:number*/ = 0;
export { tmpAnonDefaultExport as default };
$(0, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = 0;
export { tmpAnonDefaultExport as default };
$(0, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 0;
export { a as default };
$( 0, 0 );
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
