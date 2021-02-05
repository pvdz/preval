# Preval test case

# nested_double.md

> normalize > hoisting > func > nested_double
>
> Note: not valid in global. Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

#TODO

## Input

`````js filename=intro
$(g());
function g() {
  $(f(3));
  function f() { return $(1); }
  function f() { return $(2); }
}
`````

## Normalized

`````js filename=intro
function g() {
  function f() {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  }
  ('<eliminated duplicate func decl `f`>');
  ('<hoisted func decl `f`>');
  const tmpCallCallee = $;
  const tmpCalleeParam = f(3);
  tmpCallCallee(tmpCalleeParam);
  ('<hoisted func decl `f`>');
  ('<hoisted func decl `f`>');
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = g();
tmpCallCallee$1(tmpCalleeParam$1);
('<hoisted func decl `g`>');
`````

## Output

`````js filename=intro
function g() {
  function f() {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  }
  const tmpCallCallee = $;
  const tmpCalleeParam = f(3);
  tmpCallCallee(tmpCalleeParam);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = g();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
