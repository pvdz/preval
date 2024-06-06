# Preval test case

# base_class_name.md

> Normalize > Export > Default > Base class name
>
> Exporting a class

#TODO

## Input

`````js filename=intro
export default class X {};
new X();
`````

## Pre Normal


`````js filename=intro
let X = class {};
export { X };
new X();
`````

## Normalized


`````js filename=intro
let X = class {};
export { X };
new X();
`````

## Output


`````js filename=intro
const X = class {};
export { X };
new X();
`````

## PST Output

With rename=true

`````js filename=intro
const a = class   {

};
export { a as X from "undefined"
new a();
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
