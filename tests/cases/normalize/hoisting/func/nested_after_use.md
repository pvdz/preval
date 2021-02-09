# Preval test case

# nested_after_use.md

> normalize > hoisting > func > nested_after_use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

#TODO

## Input

`````js filename=intro
$(g());
function g() {
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
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f(1);
  tmpCallCallee$1(tmpCalleeParam$1);
}
const tmpCallCallee = $;
const tmpCalleeParam = g();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function g() {
  function f() {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  }
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f(1);
  tmpCallCallee$1(tmpCalleeParam$1);
}
const tmpCallCallee = $;
const tmpCalleeParam = g();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
