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
    if (tmpTernaryTest) {
      tmpNullish_1 = a;
    } else {
      tmpNullish_1 = obj;
    }
    tmpTernaryTest_1 = tmpNullish_1 == null;
    if (tmpTernaryTest_1) {
      tmpNullish = b;
    } else {
      tmpNullish = tmpNullish_1;
    }
    tmpTernaryTest_2 = tmpNullish == null;
    if (tmpTernaryTest_2) {
      tmpArg = c;
    } else {
      tmpArg = tmpNullish;
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
  if (tmpTernaryTest) {
    tmpNullish_1 = a;
  } else {
    tmpNullish_1 = obj;
  }
  tmpTernaryTest_1 = tmpNullish_1 == null;
  if (tmpTernaryTest_1) {
    tmpNullish = b;
  } else {
    tmpNullish = tmpNullish_1;
  }
  tmpTernaryTest_2 = tmpNullish == null;
  if (tmpTernaryTest_2) {
    tmpArg = c;
  } else {
    tmpArg = tmpNullish;
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
 - 1: {"a":{"b":{}}}
 - 2: {"a":{"b":{}}}
 - 3: undefined

Normalized calls: BAD?!
[[], '<crash[ Assignment to constant variable. ]>'];

Final output calls: BAD!!
[[], '<crash[ Assignment to constant variable. ]>'];

