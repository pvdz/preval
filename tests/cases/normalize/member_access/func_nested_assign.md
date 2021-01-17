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
  var tmpObjPropValue;
  var tmpObjPropValue_1;
  var tmpAssignMemLhsObj;
  var tmpAssignMemRhs;
  var tmpArg;
  var tmpMemberComplexObj;
  tmpObjPropValue_1 = $();
  tmpObjPropValue = { b: tmpObjPropValue_1 };
  const obj = { a: tmpObjPropValue };
  tmpAssignMemLhsObj = obj.a;
  tmpAssignMemRhs = 15;
  tmpAssignMemLhsObj.b = tmpAssignMemRhs;
  {
    tmpMemberComplexObj = obj.a;
    tmpArg = tmpMemberComplexObj.b;
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
  var tmpAssignMemRhs;
  var tmpArg;
  var tmpMemberComplexObj;
  tmpObjPropValue_1 = $();
  tmpObjPropValue = { b: tmpObjPropValue_1 };
  const obj = { a: tmpObjPropValue };
  tmpAssignMemLhsObj = obj.a;
  tmpAssignMemRhs = 15;
  tmpAssignMemLhsObj.b = tmpAssignMemRhs;
  tmpMemberComplexObj = obj.a;
  tmpArg = tmpMemberComplexObj.b;
  let tmpStmtArg = $(tmpArg);
  return tmpStmtArg;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````
