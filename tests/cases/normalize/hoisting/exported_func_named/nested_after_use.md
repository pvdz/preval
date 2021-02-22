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

## Normalized

`````js filename=intro
function g() {
  function f() {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  }
  const tmpCallCallee = $;
  const tmpCalleeParam = f(1);
  tmpCallCallee(tmpCalleeParam);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = g();
tmpCallCallee$1(tmpCalleeParam$1);
export { g };
`````

## Output

`````js filename=intro
function g() {
  function f() {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  }
  const tmpCalleeParam = f(1);
  $(tmpCalleeParam);
}
const tmpCalleeParam$1 = g();
$(tmpCalleeParam$1);
export { g };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
