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
const tmpAnonDefaultExport /*:class*/ = class {};
export { tmpAnonDefaultExport as default };
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpAnonDefaultExport = class {};
export { tmpAnonDefaultExport as default };
`````

## Pre Normal


`````js filename=intro
const tmpAnonDefaultExport = class {};
export { tmpAnonDefaultExport as default };
`````

## Normalized


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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
