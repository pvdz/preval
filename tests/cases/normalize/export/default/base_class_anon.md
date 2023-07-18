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

## Pre Normal

`````js filename=intro
const tmpAnonDefaultExport = class {};
export { tmpAnonDefaultExport as default };
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

## PST Output

With rename=true

`````js filename=intro
const a = class   {

};
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
