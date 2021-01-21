# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a.b = 15;
  return $(obj?.a?.b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpObjPropValue;
  var tmpObjPropValue_1;
  var tmpAssignMemLhsObj;
  var tmpArg;
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  var tmpTernaryTest_1;
  var tmpTernaryAlternate_1;
  tmpObjPropValue_1 = $();
  tmpObjPropValue = { b: tmpObjPropValue_1 };
  const obj = { a: tmpObjPropValue };
  tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
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
    let tmpStmtArg = $(tmpArg);
    return tmpStmtArg;
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
  var tmpAssignMemLhsObj;
  var tmpArg;
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  var tmpTernaryTest_1;
  var tmpTernaryAlternate_1;
  tmpObjPropValue_1 = $();
  tmpObjPropValue = { b: tmpObjPropValue_1 };
  const obj = { a: tmpObjPropValue };
  tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
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
  let tmpStmtArg = $(tmpArg);
  return tmpStmtArg;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: 15
 - 2: 15
 - 3: undefined

Normalized calls: Same

Final output calls: Same
