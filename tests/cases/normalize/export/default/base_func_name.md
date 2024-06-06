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

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
};
export { f as default };
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
export { f as default };
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  return undefined;
};
export { f as default };
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
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
