# Preval test case

# base_literal.md

> Normalize > Export > Default > Base literal
>
> Exporting a value

## Input

`````js filename=intro
export default 500;
`````

## Pre Normal


`````js filename=intro
const tmpAnonDefaultExport = 500;
export { tmpAnonDefaultExport as default };
`````

## Normalized


`````js filename=intro
const tmpAnonDefaultExport = 500;
export { tmpAnonDefaultExport as default };
`````

## Output


`````js filename=intro
const tmpAnonDefaultExport /*:number*/ = 500;
export { tmpAnonDefaultExport as default };
`````

## PST Output

With rename=true

`````js filename=intro
const a = 500;
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
