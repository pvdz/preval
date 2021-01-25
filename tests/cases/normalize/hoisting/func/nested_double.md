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
    let tmpReturnArg = $(2);
    return tmpReturnArg;
  }
  var tmpArg;
  ('<eliminated duplicate func decl `f`>');
  ('<hoisted func decl `f`>');
  tmpArg = f(3);
  $(tmpArg);
  ('<hoisted func decl `f`>');
  ('<hoisted func decl `f`>');
}
var tmpArg$1;
('<hoisted func decl `g`>');
tmpArg$1 = g();
$(tmpArg$1);
('<hoisted func decl `g`>');
`````

## Output

`````js filename=intro
function g() {
  function f() {
    let tmpReturnArg = $(2);
    return tmpReturnArg;
  }
  var tmpArg;
  tmpArg = f(3);
  $(tmpArg);
}
var tmpArg$1;
tmpArg$1 = g();
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 2
 - 2: null
 - 3: undefined

Normalized calls: Same

Final output calls: Same
