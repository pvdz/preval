# Preval test case

# nested_double.md

> Normalize > Hoisting > Exported func default anon > Nested double
>
> Note: not valid in global. Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

## Input

`````js filename=intro
$(1);
export default function() {
  $(f(3));
  function f() { return $(1); }
  function f() { return $(2); }
}
`````

## Pre Normal


`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  debugger;
  let f = function () {
    debugger;
    return $(2);
  };
  $(f(3));
};
export { tmpAnonDefaultExport as default };
`````

## Normalized


`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  debugger;
  let f = function () {
    debugger;
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = f(3);
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
export { tmpAnonDefaultExport as default };
`````

## Output


`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  debugger;
  const tmpCalleeParam = $(2);
  $(tmpCalleeParam);
  return undefined;
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
  $( b );
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
