# Preval test case

# func_export_named.md

> Normalize > Hoisting > Base > Func export named
>
> Exported func decls are still hoisted

#TODO

## Input

`````js filename=intro
$(f);
export function f(){}
$(f);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
};
$(f);
$(f);
export { f };
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
$(f);
$(f);
export { f };
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  return undefined;
};
$(f);
$(f);
export { f };
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
$( a );
$( a );
export { a as f };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
