# Preval test case

# base_class_anon.md

> Normalize > Export > Default > Base class anon
>
> Exporting a class

## Input

`````js filename=intro
export default class {}
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:class*/ /*truthy*/ = class {};
export { tmpAnonDefaultExport as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = class {};
export { tmpAnonDefaultExport as default };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {

};
export { a as default };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAnonDefaultExport = class {};
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
