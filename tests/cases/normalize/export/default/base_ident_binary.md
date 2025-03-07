# Preval test case

# base_ident_binary.md

> Normalize > Export > Default > Base ident binary
>
> Exporting a value

## Input

`````js filename=intro
export default $(1) + $(2);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
const tmpAnonDefaultExport /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
export { tmpAnonDefaultExport as default };
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = $(1) + $(2);
export { tmpAnonDefaultExport as default };
`````

## Pre Normal


`````js filename=intro
const tmpAnonDefaultExport = $(1) + $(2);
export { tmpAnonDefaultExport as default };
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpAnonDefaultExport = tmpBinBothLhs + tmpBinBothRhs;
export { tmpAnonDefaultExport as default };
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
export { c as default };
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
