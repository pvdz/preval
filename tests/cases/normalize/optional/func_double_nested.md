# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: {c: $()}}};
  return $(obj?.a?.b?.c);
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
  var tmpOptionalChaining;
  var tmpOptionalChaining_1;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  var tmpTernaryTest_1;
  var tmpTernaryAlternate_1;
  var tmpTernaryTest_2;
  var tmpTernaryAlternate_2;
  tmpObjPropValue_2 = $();
  tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
  tmpObjPropValue = { b: tmpObjPropValue_1 };
  const obj = { a: tmpObjPropValue };
  {
    tmpTernaryTest = obj == null;
    if (tmpTernaryTest) {
      tmpOptionalChaining_1 = undefined;
    } else {
      tmpTernaryAlternate = obj.a;
      tmpOptionalChaining_1 = tmpTernaryAlternate;
    }
    tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
    if (tmpTernaryTest_1) {
      tmpOptionalChaining = undefined;
    } else {
      tmpTernaryAlternate_1 = tmpOptionalChaining_1.b;
      tmpOptionalChaining = tmpTernaryAlternate_1;
    }
    tmpTernaryTest_2 = tmpOptionalChaining == null;
    if (tmpTernaryTest_2) {
      tmpArg = undefined;
    } else {
      tmpTernaryAlternate_2 = tmpOptionalChaining.c;
      tmpArg = tmpTernaryAlternate_2;
    }
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
  var x;
  var x;
  var x;
  x = x();
  x = { x: x };
  x = { x: x };
  var x = { x: x };
  {
    x = x * x;
    if (x) {
      x = x;
    } else {
      x = x.x;
      x = x;
    }
    x = x * x;
    if (x) {
      x = x;
    } else {
      x = x.x;
      x = x;
    }
    x = x * x;
    if (x) {
      x = x;
    } else {
      x = x.x;
      x = x;
    }
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
  var tmpOptionalChaining;
  var tmpOptionalChaining_1;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  var tmpTernaryTest_1;
  var tmpTernaryAlternate_1;
  var tmpTernaryTest_2;
  var tmpTernaryAlternate_2;
  tmpObjPropValue_2 = $();
  tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
  tmpObjPropValue = { b: tmpObjPropValue_1 };
  const obj = { a: tmpObjPropValue };
  tmpTernaryTest = obj == null;
  if (tmpTernaryTest) {
    tmpOptionalChaining_1 = undefined;
  } else {
    tmpTernaryAlternate = obj.a;
    tmpOptionalChaining_1 = tmpTernaryAlternate;
  }
  tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
  if (tmpTernaryTest_1) {
    tmpOptionalChaining = undefined;
  } else {
    tmpTernaryAlternate_1 = tmpOptionalChaining_1.b;
    tmpOptionalChaining = tmpTernaryAlternate_1;
  }
  tmpTernaryTest_2 = tmpOptionalChaining == null;
  if (tmpTernaryTest_2) {
    tmpArg = undefined;
  } else {
    tmpTernaryAlternate_2 = tmpOptionalChaining.c;
    tmpArg = tmpTernaryAlternate_2;
  }
  let tmpStmtArg = $(tmpArg);
  return tmpStmtArg;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````
