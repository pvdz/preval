# Preval test case

# base_func_anon.md

> Normalize > Export > Default > Base func anon
>
> Exporting a function

#TODO

## Input

`````js filename=intro
export default function() {}
`````

## Pre Normal

`````js filename=intro
const tmpAnonDefaultExport = function () {
  debugger;
};
export { tmpAnonDefaultExport as default };
`````

## Normalized

`````js filename=intro
const tmpAnonDefaultExport = function () {
  debugger;
};
export { tmpAnonDefaultExport as default };
`````

## Output

`````js filename=intro
const tmpAnonDefaultExport = function () {
  debugger;
};
export { tmpAnonDefaultExport as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
