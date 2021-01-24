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
  return $(obj??a??b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  var tmpAssignMemLhsObj;
  var tmpNullish;
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  var tmpTernaryTest;
  var tmpTernaryTest$1;
  tmpObjPropValue$1 = $();
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
  {
    obj = obj;
    tmpTernaryTest = obj == null;
    if (tmpTernaryTest) {
      tmpNullish = a;
    } else {
      tmpNullish = obj;
    }
    tmpTernaryTest$1 = tmpNullish == null;
    if (tmpTernaryTest$1) {
      tmpArg = b;
    } else {
      tmpArg = tmpNullish;
    }
    let tmpReturnArg = $(tmpArg);
    return tmpReturnArg;
  }
}
var tmpArg$1;
('<hoisted func decl `f`>');
tmpArg$1 = f();
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpAssignMemLhsObj;
  var tmpNullish;
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  var tmpTernaryTest;
  var tmpTernaryTest$1;
  tmpObjPropValue$1 = $();
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
  obj = obj;
  tmpTernaryTest = obj == null;
  if (tmpTernaryTest) {
    tmpNullish = a;
  } else {
    tmpNullish = obj;
  }
  tmpTernaryTest$1 = tmpNullish == null;
  if (tmpTernaryTest$1) {
    tmpArg = b;
  } else {
    tmpArg = tmpNullish;
  }
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg$1;
tmpArg$1 = f();
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: {"a":{"b":15}}
 - 2: {"a":{"b":15}}
 - 3: undefined

Normalized calls: BAD?!
[[], '<crash[ Assignment to constant variable. ]>'];

Final output calls: BAD!!
[[], '<crash[ Assignment to constant variable. ]>'];

