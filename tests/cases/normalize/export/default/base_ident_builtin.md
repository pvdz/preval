# Preval test case

# base_ident_builtin.md

> Normalize > Export > Default > Base ident builtin
>
> Exporting a value

## Input

`````js filename=intro
export default undefined;
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:undefined*/ = undefined;
export { tmpAnonDefaultExport as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = undefined;
export { tmpAnonDefaultExport as default };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = undefined;
export { a as default };
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
