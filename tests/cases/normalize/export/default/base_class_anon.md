# Preval test case

# base_class_anon.md

> Normalize > Export > Default > Base class anon
>
> Exporting a class

#TODO

## Input

`````js filename=intro
export default class {}
`````

## Normalized

`````js filename=intro
const tmpAnonDefaultExport = class {};
export { tmpAnonDefaultExport as default };
`````

## Output

`````js filename=intro
const tmpAnonDefaultExport = class {};
export { tmpAnonDefaultExport as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
