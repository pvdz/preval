# Preval test case

# func_export_default_anon.md

> Normalize > Hoisting > Base > Func export default anon
>
> This should not be hoisted because you can't refer to it anyways

## Input

`````js filename=intro
$(f);
export default function(){}
$(f);
`````

## Pre Normal


`````js filename=intro
$(f);
const tmpAnonDefaultExport = function () {
  debugger;
};
export { tmpAnonDefaultExport as default };
$(f);
`````

## Normalized


`````js filename=intro
$(f);
const tmpAnonDefaultExport = function () {
  debugger;
  return undefined;
};
export { tmpAnonDefaultExport as default };
$(f);
`````

## Output


`````js filename=intro
$(f);
const tmpAnonDefaultExport /*:()=>*/ = function () {
  debugger;
  return undefined;
};
export { tmpAnonDefaultExport as default };
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
$( f );
const a = function() {
  debugger;
  return undefined;
};
export { a as default };
$( f );
`````

## Globals

BAD@! Found 1 implicit global bindings:

f

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
