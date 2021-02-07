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
    const tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
  }
  ('<eliminated duplicate func decl `f`>');
  ('<hoisted func decl `f`>');
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f(3);
  tmpCallCallee$1(tmpCalleeParam$1);
  ('<hoisted func decl `f`>');
  ('<hoisted func decl `f`>');
}
const tmpCallCallee = $;
const tmpCalleeParam = g();
tmpCallCallee(tmpCalleeParam);
('<hoisted func decl `g`>');
`````

## Output

`````js filename=intro
function g() {
  function f() {
    const tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
  }
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f(3);
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
