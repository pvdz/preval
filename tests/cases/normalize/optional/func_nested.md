# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  return $(obj?.a?.b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpObjPropValue;
  var tmpObjPropValue_1;
  var tmpArg;
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  var tmpTernaryTest_1;
  var tmpTernaryAlternate_1;
  tmpObjPropValue_1 = $();
  tmpObjPropValue = { b: tmpObjPropValue_1 };
  const obj = { a: tmpObjPropValue };
  {
    tmpTernaryTest = obj == null;
    if (tmpTernaryTest) {
      tmpOptionalChaining = undefined;
    } else {
      tmpTernaryAlternate = obj.a;
      tmpOptionalChaining = tmpTernaryAlternate;
    }
    tmpTernaryTest_1 = tmpOptionalChaining == null;
    if (tmpTernaryTest_1) {
      tmpArg = undefined;
    } else {
      tmpTernaryAlternate_1 = tmpOptionalChaining.b;
      tmpArg = tmpTernaryAlternate_1;
    }
    let tmpReturnArg = $(tmpArg);
    return tmpReturnArg;
  }
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f() {
  var tmpObjPropValue;
  var tmpObjPropValue_1;
  var tmpArg;
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  var tmpTernaryTest_1;
  var tmpTernaryAlternate_1;
  tmpObjPropValue_1 = $();
  tmpObjPropValue = { b: tmpObjPropValue_1 };
  const obj = { a: tmpObjPropValue };
  tmpTernaryTest = obj == null;
  if (tmpTernaryTest) {
    tmpOptionalChaining = undefined;
  } else {
    tmpTernaryAlternate = obj.a;
    tmpOptionalChaining = tmpTernaryAlternate;
  }
  tmpTernaryTest_1 = tmpOptionalChaining == null;
  if (tmpTernaryTest_1) {
    tmpArg = undefined;
  } else {
    tmpTernaryAlternate_1 = tmpOptionalChaining.b;
    tmpArg = tmpTernaryAlternate_1;
  }
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: null
 - 2: null
 - 3: undefined

Normalized calls: Same

Final output calls: Same
