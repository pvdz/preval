# Preval test case

# nested_after_use.md

> Normalize > Hoisting > Exported func named > Nested after use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

## Input

`````js filename=intro
$(g());
export function g() {
  $(f(1));
  function f() {
    return $(2);
  }
}
`````

## Pre Normal

`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    return $(2);
  };
  $(f(1));
};
$(g());
export { g };
`````

## Normalized

`````js filename=intro
let g = function () {
  debugger;
  let f = function () {
    debugger;
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = f(1);
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = g();
tmpCallCallee$1(tmpCalleeParam$1);
export { g };
`````

## Output

`````js filename=intro
const g = function () {
  debugger;
  const tmpCalleeParam = $(2);
  $(tmpCalleeParam);
  return undefined;
};
g();
$(undefined);
export { g };
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 2 );
  $( b );
  return undefined;
},;
a();
$( undefined );
export { a as g from "undefined"
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
