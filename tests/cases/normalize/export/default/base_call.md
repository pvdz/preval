# Preval test case

# base_call.md

> Normalize > Export > Default > Base call
>
> Exporting a value

## Input

`````js filename=intro
export default $(1);
`````


## Settled


`````js filename=intro
const tmpAnonDefaultExport /*:unknown*/ = $(1);
export { tmpAnonDefaultExport as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = $(1);
export { tmpAnonDefaultExport as default };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
export { a as default };
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
