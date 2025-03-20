# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident logic or simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = 0 || 2;
$(a);
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:number*/ = 2;
export { tmpAnonDefaultExport as default };
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = 2;
export { tmpAnonDefaultExport as default };
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 2;
export { a as default };
$( 2 );
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
