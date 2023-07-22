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
let f = function () {
  debugger;
};
f();
export { f };
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
f();
export { f };
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  return undefined;
};
export { f };
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
export { a as f from "undefined"
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
