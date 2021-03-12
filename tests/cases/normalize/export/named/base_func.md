# Preval test case

# base_func.md

> Normalize > Export > Named > Base func
>
> Exporting declarations

#TODO

## Input

`````js filename=intro
export function f() {};
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {};
f();
export { f };
`````

## Normalized

`````js filename=intro
let f = function () {};
f();
export { f };
`````

## Output

`````js filename=intro
const f = function () {};
export { f };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
