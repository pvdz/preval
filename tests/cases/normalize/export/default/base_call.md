# Preval test case

# base_call.md

> Normalize > Export > Default > Base call
>
> Exporting a value

#TODO

## Input

`````js filename=intro
export default $(1);
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

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
