# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
obj.a.b = 15;
$(obj.a.b);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpArg;
var tmpMemberComplexObj;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
{
  tmpAssignMemLhsObj = obj.a;
  tmpAssignMemRhs = 15;
  tmpAssignMemLhsObj.b = tmpAssignMemRhs;
}
tmpMemberComplexObj = obj.a;
tmpArg = tmpMemberComplexObj.b;
$(tmpArg);
`````

## Output

`````js filename=intro
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
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: 15
 - 2: undefined

Normalized calls: Same

Final output calls: Same
