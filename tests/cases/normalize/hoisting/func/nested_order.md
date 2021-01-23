# Preval test case

# nested_order.md

> normalize > hoisting > func > nested_order
>
> How do we normalize multiple func decls on the same level?

## Input

`````js filename=intro
$(f());
function f() {
  $(f(), g(), h());
    
  function f() { return $(); }
  function g() { return $(); }
  function h() { return $(); }
}
`````

## Normalized

`````js filename=intro
function f() {
  function f_1() {
    {
      let tmpReturnArg = $();
      return tmpReturnArg;
    }
  }
  function g() {
    {
      let tmpReturnArg_1 = $();
      return tmpReturnArg_1;
    }
  }
  function h() {
    {
      let tmpReturnArg_2 = $();
      return tmpReturnArg_2;
    }
  }
  var tmpArg_1;
  var tmpArg_2;
  var tmpArg_3;
  tmpArg_1 = f_1();
  tmpArg_2 = g();
  tmpArg_3 = h();
  $(tmpArg_1, tmpArg_2, tmpArg_3);
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  function f_1() {
    let tmpReturnArg = $();
    return tmpReturnArg;
  }
  function g() {
    let tmpReturnArg_1 = $();
    return tmpReturnArg_1;
  }
  function h() {
    let tmpReturnArg_2 = $();
    return tmpReturnArg_2;
  }
  var tmpArg_1;
  var tmpArg_2;
  var tmpArg_3;
  tmpArg_1 = f_1();
  tmpArg_2 = g();
  tmpArg_3 = h();
  $(tmpArg_1, tmpArg_2, tmpArg_3);
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: 
 - 2: 
 - 3: null,null,null
 - 4: null
 - 5: undefined

Normalized calls: Same

Final output calls: Same
