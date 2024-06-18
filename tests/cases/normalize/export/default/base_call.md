# Preval test case

# base_call.md

> Normalize > Export > Default > Base call
>
> Exporting a value

## Input

`````js filename=intro
export default $(1);
`````

## Pre Normal


`````js filename=intro
const tmpAnonDefaultExport = $(1);
export { tmpAnonDefaultExport as default };
`````

## Normalized


`````js filename=intro
const tmpAnonDefaultExport = $(1);
export { tmpAnonDefaultExport as default };
`````

## Output


`````js filename=intro
const tmpAnonDefaultExport = $(1);
export { tmpAnonDefaultExport as default };
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
export { a as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
