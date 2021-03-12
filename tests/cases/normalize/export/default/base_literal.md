# Preval test case

# base_literal.md

> Normalize > Export > Default > Base literal
>
> Exporting a value

#TODO

## Input

`````js filename=intro
export default 500;
`````

## Normalized

`````js filename=intro
const tmpAnonDefaultExport = 500;
export { tmpAnonDefaultExport as default };
`````

## Output

`````js filename=intro
const tmpAnonDefaultExport = 500;
export { tmpAnonDefaultExport as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
