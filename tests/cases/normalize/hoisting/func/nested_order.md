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
  var tmpArg;
  var tmpArg$1;
  var tmpArg$2;
  ('<hoisted func decl `f`>');
  ('<hoisted func decl `g`>');
  ('<hoisted func decl `h`>');
  tmpArg = f_1();
  tmpArg$1 = g();
  tmpArg$2 = h();
  $(tmpArg, tmpArg$1, tmpArg$2);
  ('<hoisted func decl `f`>');
  ('<hoisted func decl `g`>');
  ('<hoisted func decl `h`>');
}
var tmpArg$3;
('<hoisted func decl `f`>');
tmpArg$3 = f();
$(tmpArg$3);
('<hoisted func decl `f`>');
`````

## Output

`````js filename=intro
function f() {
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
  var tmpArg;
  var tmpArg$1;
  var tmpArg$2;
  tmpArg = f_1();
  tmpArg$1 = g();
  tmpArg$2 = h();
  $(tmpArg, tmpArg$1, tmpArg$2);
}
var tmpArg$3;
tmpArg$3 = f();
$(tmpArg$3);
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
