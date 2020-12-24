# Preval test case

# global_after_use.md

> normalize > hoisting > func > global_after_use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

## Input

`````js filename=intro
$(f(1));
export function f() { return $(2); }
`````

## Normalized

`````js filename=intro
export function f() {
  return $(2);
}
var tmpArg;
tmpArg = f(1);
$(tmpArg);
`````

## Output

`````js filename=intro
export function f() {
  return $(2);
}
var tmpArg;
tmpArg = f(1);
$(tmpArg);
`````
