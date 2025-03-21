# Preval test case

# base_ident_const.md

> Normalize > Export > Default > Base ident const
>
> Exporting a value

## Input

`````js filename=intro
const FOO = $(1);

export default FOO;
`````


## Settled


`````js filename=intro
const FOO /*:unknown*/ = $(1);
const tmpAnonDefaultExport /*:unknown*/ = FOO;
export { tmpAnonDefaultExport as default };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const FOO = $(1);
const tmpAnonDefaultExport = FOO;
export { tmpAnonDefaultExport as default };
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a;
export { b as default };
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
