# Preval test case

# nested_double.md

> Normalize > Hoisting > Exported func default > Nested double
>
> Note: not valid in global. Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

## Input

`````js filename=intro
$(g());
export default function g() {
  $(f(3));
  function f() { return $(1); }
  function f() { return $(2); }
}
`````

## Normalized

`````js filename=intro
let g = function () {
  let f = function () {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  };
  const tmpCallCallee = $;
  const tmpCalleeParam = f(3);
  tmpCallCallee(tmpCalleeParam);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = g();
tmpCallCallee$1(tmpCalleeParam$1);
export { g as default };
`````

## Output

`````js filename=intro
const g = function () {
  const f = function () {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  };
  const tmpCalleeParam = f(3);
  $(tmpCalleeParam);
};
const tmpCalleeParam$1 = g();
$(tmpCalleeParam$1);
export { g as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
