# Preval test case

# prop_no_no_no.md

> normalize > optional > prop_no_no_no
>
> Mix optional with regular member expressions

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

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x = {};
x = x.x;
x = x.x;
x = x.x;
x(x);
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
