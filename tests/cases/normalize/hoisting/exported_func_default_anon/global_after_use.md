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

## Normalized

`````js filename=intro
$(1);
export default function () {
  const tmpReturnArg = $(2);
  return tmpReturnArg;
}
`````

## Output

`````js filename=intro
$(1);
export default function () {
  const tmpReturnArg = $(2);
  return tmpReturnArg;
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same