# Preval test case

# global_nested.md

> normalize > member_access > global_nested
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
obj.a.b = 15;
$(obj??a??b);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryTest_1;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpAssignMemLhsObj = obj.a;
tmpAssignMemRhs = 15;
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
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
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryTest_1;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpAssignMemLhsObj = obj.a;
tmpAssignMemRhs = 15;
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
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
$(tmpArg);
`````
