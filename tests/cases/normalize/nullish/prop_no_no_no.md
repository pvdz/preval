# Preval test case

# prop_no_no_no.md

> normalize > nullish > prop_no_no_no
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b.c.d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
const a = {};
tmpComplexMemberObj_1 = a.b;
tmpComplexMemberObj = tmpComplexMemberObj_1.c;
tmpArg = tmpComplexMemberObj.d;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
const a = {};
tmpComplexMemberObj_1 = a.b;
tmpComplexMemberObj = tmpComplexMemberObj_1.c;
tmpArg = tmpComplexMemberObj.d;
$(tmpArg);
`````
