# Preval test case

# global_after_use.md

> Normalize > Hoisting > Exported func default anon > Global after use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

## Input

`````js filename=intro
$(1);
export default function() { return $(2); }
`````

## Pre Normal


`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  debugger;
  return $(2);
};
export { tmpAnonDefaultExport as default };
`````

## Normalized


`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  debugger;
  const tmpReturnArg = $(2);
  return tmpReturnArg;
};
export { tmpAnonDefaultExport as default };
`````

## Output


`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  debugger;
  const tmpReturnArg = $(2);
  return tmpReturnArg;
};
export { tmpAnonDefaultExport as default };
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = function() {
  debugger;
  const b = $( 2 );
  return b;
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
