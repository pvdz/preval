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
  return $(obj.a.b);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  var tmpAssignMemLhsObj;
  var tmpMemberComplexObj;
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  tmpObjPropValue$1 = $();
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
  {
    tmpMemberComplexObj = obj.a;
    tmpArg = tmpMemberComplexObj.b;
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
  var tmpMemberComplexObj;
  var tmpObjPropValue;
  var tmpObjPropValue$1;
  tmpObjPropValue$1 = $();
  tmpObjPropValue = { b: tmpObjPropValue$1 };
  const obj = { a: tmpObjPropValue };
  tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
  tmpMemberComplexObj = obj.a;
  tmpArg = tmpMemberComplexObj.b;
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
 - 1: 15
 - 2: 15
 - 3: undefined

Normalized calls: Same

Final output calls: Same
