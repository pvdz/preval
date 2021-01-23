# Preval test case

# nested_double.md

> normalize > hoisting > func > nested_double
>
> Note: not valid in global. Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

## Input

`````js filename=intro
$(g());
export function g() {
  $(f(3));
  function f() { return $(1); }
  function f() { return $(2); }
}
`````

## Normalized

`````js filename=intro
export function g() {
  function f() {
    {
      let tmpReturnArg = $(1);
      return tmpReturnArg;
    }
  }
  function f() {
    {
      let tmpReturnArg$1 = $(2);
      return tmpReturnArg$1;
    }
  }
  var tmpArg$1;
  tmpArg$1 = f(3);
  $(tmpArg$1);
}
var tmpArg;
tmpArg = g();
$(tmpArg);
`````

## Output

`````js filename=intro
export function g() {
  function f() {
    let tmpReturnArg = $(1);
    return tmpReturnArg;
  }
  function f() {
    let tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
  }
  var tmpArg$1;
  tmpArg$1 = f(3);
  $(tmpArg$1);
}
var tmpArg;
tmpArg = g();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
