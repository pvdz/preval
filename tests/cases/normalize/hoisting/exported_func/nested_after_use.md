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
    {
      let tmpReturnArg = $(2);
      return tmpReturnArg;
    }
  }
  var tmpArg;
  ('<hoisted var `tmpArg` decl without init>');
  tmpArg = f(1);
  $(tmpArg);
  ('<hoisted func decl `f`>');
}
var tmpArg$1;
('<hoisted var `tmpArg$1` decl without init>');
tmpArg$1 = g();
$(tmpArg$1);
('<hoisted func decl `g`>');
`````

## Output

`````js filename=intro
export function g() {
  function f() {
    let tmpReturnArg = $(2);
    return tmpReturnArg;
  }
  var tmpArg;
  tmpArg = f(1);
  $(tmpArg);
}
var tmpArg$1;
tmpArg$1 = g();
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
