# Preval test case

# base_func_name.md

> Normalize > Export > Default > Base func name
>
> Exporting a function

#TODO

## Input

`````js filename=intro
export default function f() {}
`````

## Normalized

`````js filename=intro
let f = function () {};
export { f as default };
`````

## Output

`````js filename=intro
const f = function () {};
export { f as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
