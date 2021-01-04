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
var tmpComplexMemberObj;
var tmpArg;
var tmpComplexMemberObj_1;
const obj = { a: { b: $() } };
tmpComplexMemberObj = obj.a;
tmpComplexMemberObj.b = 15;
tmpComplexMemberObj_1 = obj.a;
tmpArg = tmpComplexMemberObj_1.b;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpComplexMemberObj;
var tmpArg;
var tmpComplexMemberObj_1;
const obj = { a: { b: $() } };
tmpComplexMemberObj = obj.a;
tmpComplexMemberObj.b = 15;
tmpComplexMemberObj_1 = obj.a;
tmpArg = tmpComplexMemberObj_1.b;
$(tmpArg);
`````
