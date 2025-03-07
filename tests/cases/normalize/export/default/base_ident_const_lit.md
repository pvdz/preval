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
const tmpAnonDefaultExport /*:number*/ = 100;
export { tmpAnonDefaultExport as default };
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = 100;
export { tmpAnonDefaultExport as default };
`````

## Pre Normal


`````js filename=intro
const FOO = 100;
const tmpAnonDefaultExport = FOO;
export { tmpAnonDefaultExport as default };
`````

## Normalized


`````js filename=intro
const FOO = 100;
const tmpAnonDefaultExport = FOO;
export { tmpAnonDefaultExport as default };
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 100;
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
