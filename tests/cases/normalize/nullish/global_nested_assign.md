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
var tmpComplexMemberObj;
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryTest_1;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpComplexMemberObj = obj.a;
tmpComplexMemberObj.b = 15;
obj = obj;
tmpTernaryTest = obj == null;
tmpNullish = tmpTernaryTest ? a : obj;
tmpTernaryTest_1 = tmpNullish == null;
tmpArg = tmpTernaryTest_1 ? b : tmpNullish;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpComplexMemberObj;
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryTest_1;
tmpObjPropValue_1 = $();
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpComplexMemberObj = obj.a;
tmpComplexMemberObj.b = 15;
obj = obj;
tmpTernaryTest = obj == null;
tmpNullish = tmpTernaryTest ? a : obj;
tmpTernaryTest_1 = tmpNullish == null;
tmpArg = tmpTernaryTest_1 ? b : tmpNullish;
$(tmpArg);
`````
