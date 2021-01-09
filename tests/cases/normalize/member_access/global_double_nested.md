# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
$(obj.a.b.c);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpObjPropValue_2;
var tmpArg;
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
tmpObjPropValue_2 = $();
tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpComplexMemberObj_1 = obj.a;
tmpComplexMemberObj = tmpComplexMemberObj_1.b;
tmpArg = tmpComplexMemberObj.c;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
x = x();
x = { x: x };
x = { x: x };
var x = { x: x };
x = x.x;
x = x.x;
x = x.x;
x(x);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
var tmpObjPropValue_2;
var tmpArg;
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
tmpObjPropValue_2 = $();
tmpObjPropValue_1 = { c: tmpObjPropValue_2 };
tmpObjPropValue = { b: tmpObjPropValue_1 };
const obj = { a: tmpObjPropValue };
tmpComplexMemberObj_1 = obj.a;
tmpComplexMemberObj = tmpComplexMemberObj_1.b;
tmpArg = tmpComplexMemberObj.c;
$(tmpArg);
`````
