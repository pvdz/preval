# Preval test case

# base_ident_const_lit.md

> Normalize > Export > Default > Base ident const lit
>
> Exporting a value

## Input

`````js filename=intro
const FOO = 100;

export default FOO;
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:number*/ /*truthy*/ = 100;
export { tmpAnonDefaultExport as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = 100;
export { tmpAnonDefaultExport as default };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 100;
export { a as default };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const FOO = 100;
const tmpAnonDefaultExport = FOO;
export { tmpAnonDefaultExport as default };
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
