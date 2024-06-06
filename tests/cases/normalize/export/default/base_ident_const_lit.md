# Preval test case

# base_ident_const_lit.md

> Normalize > Export > Default > Base ident const lit
>
> Exporting a value

#TODO

## Input

`````js filename=intro
const FOO = 100;

export default FOO;
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

## Output


`````js filename=intro
const tmpAnonDefaultExport = 100;
export { tmpAnonDefaultExport as default };
`````

## PST Output

With rename=true

`````js filename=intro
const a = 100;
export { a as default from "undefined"
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
