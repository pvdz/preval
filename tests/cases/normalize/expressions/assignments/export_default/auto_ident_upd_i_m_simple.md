# Preval test case

# auto_ident_upd_i_m_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
export default a = b--;
$(a, b);
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:number*/ = 1;
export { tmpAnonDefaultExport as default };
$(1, 0);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = 1;
export { tmpAnonDefaultExport as default };
$(1, 0);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 1;
export { a as default };
$( 1, 0 );
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
