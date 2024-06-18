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

## Pre Normal


`````js filename=intro
const FOO = $(1);
const tmpAnonDefaultExport = FOO;
export { tmpAnonDefaultExport as default };
`````

## Normalized


`````js filename=intro
const FOO = $(1);
const tmpAnonDefaultExport = FOO;
export { tmpAnonDefaultExport as default };
`````

## Output


`````js filename=intro
const FOO = $(1);
const tmpAnonDefaultExport = FOO;
export { tmpAnonDefaultExport as default };
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = a;
export { b as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
