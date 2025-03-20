# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Assignments > Export default > Auto ident cond simple s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default a = 1 ? (40, 50, 60) : $($(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:number*/ = 60;
export { tmpAnonDefaultExport as default };
$(60);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = 60;
export { tmpAnonDefaultExport as default };
$(60);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 60;
export { a as default };
$( 60 );
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
