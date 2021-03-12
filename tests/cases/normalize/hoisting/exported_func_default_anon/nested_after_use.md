# Preval test case

# nested_after_use.md

> Normalize > Hoisting > Exported func default anon > Nested after use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

Exported functions must still hoist their own body

## Input

`````js filename=intro
$(1);
export default function() {
  $(f(1));
  function f() {
    return $(2);
  }
}
`````

## Normalized

`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  let f = function () {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = f(1);
  tmpCallCallee(tmpCalleeParam);
};
export { tmpAnonDefaultExport as default };
`````

## Output

`````js filename=intro
$(1);
const tmpAnonDefaultExport = function () {
  const f = function () {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  };
  const tmpCalleeParam = f(1);
  $(tmpCalleeParam);
};
export { tmpAnonDefaultExport as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
