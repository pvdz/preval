# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: {c: $()}}};
  return $(obj??a??b??c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpObjPropValue;
  var tmpObjPropValue_1;
  var tmpObjPropValue_2;
  var tmpArg;
  var tmpNullish;
  var tmpNullish_1;
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  var tmpTernaryTest_2;
  tmpObjPropValue_2 = $();
  tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
  tmpObjPropValue = { b: tmpObjPropValue_1 };
  const obj = { a: tmpObjPropValue };
  {
    obj = obj;
    tmpTernaryTest = obj == null;
    tmpNullish_1 = tmpTernaryTest ? a : obj;
    tmpTernaryTest_1 = tmpNullish_1 == null;
    tmpNullish = tmpTernaryTest_1 ? b : tmpNullish_1;
    tmpTernaryTest_2 = tmpNullish == null;
    tmpArg = tmpTernaryTest_2 ? c : tmpNullish;
    let tmpStmtArg = $(tmpArg);
    return tmpStmtArg;
  }
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Uniformed

`````js filename=intro
function x() {
  var x;
  var x;
  var x;
  var x;
  var x;
  var x;
  var x;
  var x;
  var x;
  x = x();
  x = { x: x };
  x = { x: x };
  var x = { x: x };
  {
    x = x;
    x = x * x;
    x = x ? x : x;
    x = x * x;
    x = x ? x : x;
    x = x * x;
    x = x ? x : x;
    var x = x(x);
    return x;
  }
}
var x;
x = x();
x(x);
`````

## Output

`````js filename=intro
function f() {
  var tmpObjPropValue;
  var tmpObjPropValue_1;
  var tmpObjPropValue_2;
  var tmpArg;
  var tmpNullish;
  var tmpNullish_1;
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  var tmpTernaryTest_2;
  tmpObjPropValue_2 = $();
  tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
  tmpObjPropValue = { b: tmpObjPropValue_1 };
  const obj = { a: tmpObjPropValue };
  obj = obj;
  tmpTernaryTest = obj == null;
  tmpNullish_1 = tmpTernaryTest ? a : obj;
  tmpTernaryTest_1 = tmpNullish_1 == null;
  tmpNullish = tmpTernaryTest_1 ? b : tmpNullish_1;
  tmpTernaryTest_2 = tmpNullish == null;
  tmpArg = tmpTernaryTest_2 ? c : tmpNullish;
  let tmpStmtArg = $(tmpArg);
  return tmpStmtArg;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````
