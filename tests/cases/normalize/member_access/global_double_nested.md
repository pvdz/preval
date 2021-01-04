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
var tmpArg;
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
const obj = { a: { b: { c: $() } } };
tmpComplexMemberObj_1 = obj.a;
tmpComplexMemberObj = tmpComplexMemberObj_1.b;
tmpArg = tmpComplexMemberObj.c;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
const obj = { a: { b: { c: $() } } };
tmpComplexMemberObj_1 = obj.a;
tmpComplexMemberObj = tmpComplexMemberObj_1.b;
tmpArg = tmpComplexMemberObj.c;
$(tmpArg);
`````
