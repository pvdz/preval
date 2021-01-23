# Preval test case

# nested_order.md

> normalize > hoisting > func > nested_order
>
> How do we normalize multiple func decls on the same level?

#TODO

## Input

`````js filename=intro
$(f());
export function f() {
  $(f(), g(), h());
    
  function f() { return $(); }
  function g() { return $(); }
  function h() { return $(); }
}
`````

## Normalized

`````js filename=intro
export function f() {
  function f_1() {
    {
      let tmpReturnArg = $();
      return tmpReturnArg;
    }
  }
  function g() {
    {
      let tmpReturnArg$1 = $();
      return tmpReturnArg$1;
    }
  }
  function h() {
    {
      let tmpReturnArg$2 = $();
      return tmpReturnArg$2;
    }
  }
  var tmpArg$1;
  var tmpArg$2;
  var tmpArg$3;
  tmpArg$1 = f_1();
  tmpArg$2 = g();
  tmpArg$3 = h();
  $(tmpArg$1, tmpArg$2, tmpArg$3);
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
export function f() {
  function f_1() {
    let tmpReturnArg = $();
    return tmpReturnArg;
  }
  function g() {
    let tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  }
  function h() {
    let tmpReturnArg$2 = $();
    return tmpReturnArg$2;
  }
  var tmpArg$1;
  var tmpArg$2;
  var tmpArg$3;
  tmpArg$1 = f_1();
  tmpArg$2 = g();
  tmpArg$3 = h();
  $(tmpArg$1, tmpArg$2, tmpArg$3);
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
