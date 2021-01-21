# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  return $(obj??a??b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpObjPropValue;
  var tmpObjPropValue_1;
  var tmpArg;
  var tmpNullish;
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  tmpObjPropValue_1 = $();
  tmpObjPropValue = { b: tmpObjPropValue_1 };
  const obj = { a: tmpObjPropValue };
  {
    obj = obj;
    tmpTernaryTest = obj == null;
    if (tmpTernaryTest) {
      tmpNullish = a;
    } else {
      tmpNullish = obj;
    }
    tmpTernaryTest_1 = tmpNullish == null;
    if (tmpTernaryTest_1) {
      tmpArg = b;
    } else {
      tmpArg = tmpNullish;
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
  var tmpArg;
  var tmpNullish;
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  tmpObjPropValue_1 = $();
  tmpObjPropValue = { b: tmpObjPropValue_1 };
  const obj = { a: tmpObjPropValue };
  obj = obj;
  tmpTernaryTest = obj == null;
  if (tmpTernaryTest) {
    tmpNullish = a;
  } else {
    tmpNullish = obj;
  }
  tmpTernaryTest_1 = tmpNullish == null;
  if (tmpTernaryTest_1) {
    tmpArg = b;
  } else {
    tmpArg = tmpNullish;
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
 - 1: {"a":{}}
 - 2: {"a":{}}
 - 3: undefined

Normalized calls: BAD?!
[[], '<crash[ Assignment to constant variable. ]>'];

Final output calls: BAD!!
[[], '<crash[ Assignment to constant variable. ]>'];

