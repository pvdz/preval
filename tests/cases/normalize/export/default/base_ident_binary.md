# Preval test case

# base_ident_binary.md

> Normalize > Export > Default > Base ident binary
>
> Exporting a value

#TODO

## Input

`````js filename=intro
export default $(1) + $(2);
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
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpAnonDefaultExport = tmpBinBothLhs + tmpBinBothRhs;
export { tmpAnonDefaultExport as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
