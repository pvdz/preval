# Preval test case

# base_ident_builtin.md

> Normalize > Export > Default > Base ident builtin
>
> Exporting a value

#TODO

## Input

`````js filename=intro
export default undefined;
`````

## Normalized

`````js filename=intro
const tmpAnonDefaultExport = undefined;
export { tmpAnonDefaultExport as default };
`````

## Output

`````js filename=intro
const tmpAnonDefaultExport = undefined;
export { tmpAnonDefaultExport as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
