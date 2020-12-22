# Preval test case

# nested_after_use.md

> normalize > hoisting > func > nested_after_use
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
export function g() {
  function f() {
    return $(2);
  }
  $(f(1));
}
$(g());
`````

## Output

`````js filename=intro
export function g() {
  function f() {
    return $(2);
  }
  $(f(1));
}
$(g());
`````
