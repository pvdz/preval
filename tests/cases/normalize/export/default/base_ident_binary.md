# Preval test case

# base_ident_binary.md

> Normalize > Export > Default > Base ident binary
>
> Exporting a value

## Input

`````js filename=intro
export default $(1) + $(2);
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

## Output


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
const tmpAnonDefaultExport /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
export { tmpAnonDefaultExport as default };
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
export { c as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
