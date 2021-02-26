# Preval test case

# global_after_use.md

> Normalize > Hoisting > Exported func named > Global after use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

## Input

`````js filename=intro
$(f(1));
export function f() { return $(2); }
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpReturnArg = $(2);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
export { f };
`````

## Output

`````js filename=intro
const f = function () {
  const tmpReturnArg = $(2);
  return tmpReturnArg;
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
export { f };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
