# Preval test case

# base_func_anon.md

> Normalize > Export > Default > Base func anon
>
> Exporting a function

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
  return undefined;
};
export { tmpAnonDefaultExport as default };
`````

## Output


`````js filename=intro
const tmpAnonDefaultExport /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
export { tmpAnonDefaultExport as default };
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
export { a as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
