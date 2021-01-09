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
    tmpOptionalChaining_1 = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = obj.a), tmpTernaryAlternate);
    tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
    tmpOptionalChaining = tmpTernaryTest_1 ? undefined : ((tmpTernaryAlternate_1 = tmpOptionalChaining_1.b), tmpTernaryAlternate_1);
    tmpTernaryTest_2 = tmpOptionalChaining == null;
    tmpArg = tmpTernaryTest_2 ? undefined : ((tmpTernaryAlternate_2 = tmpOptionalChaining.c), tmpTernaryAlternate_2);
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
  tmpOptionalChaining_1 = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = obj.a), tmpTernaryAlternate);
  tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
  tmpOptionalChaining = tmpTernaryTest_1 ? undefined : ((tmpTernaryAlternate_1 = tmpOptionalChaining_1.b), tmpTernaryAlternate_1);
  tmpTernaryTest_2 = tmpOptionalChaining == null;
  tmpArg = tmpTernaryTest_2 ? undefined : ((tmpTernaryAlternate_2 = tmpOptionalChaining.c), tmpTernaryAlternate_2);
  let tmpStmtArg = $(tmpArg);
  return tmpStmtArg;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````