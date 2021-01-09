# Preval test case

# call_no_no_no.md

> normalize > optional > call_no_no_no
>
> Mix optional with regular member call

#TODO

## Input

`````js filename=intro
const a = {};
$(a().b().c().d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
var tmpComplexMemberObj_2;
const a = {};
tmpComplexMemberObj_2 = a();
tmpComplexMemberObj_1 = tmpComplexMemberObj_2.b();
tmpComplexMemberObj = tmpComplexMemberObj_1.c();
tmpArg = tmpComplexMemberObj.d;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpComplexMemberObj;
var tmpComplexMemberObj_1;
var tmpComplexMemberObj_2;
const a = {};
tmpComplexMemberObj_2 = a();
tmpComplexMemberObj_1 = tmpComplexMemberObj_2.b();
tmpComplexMemberObj = tmpComplexMemberObj_1.c();
tmpArg = tmpComplexMemberObj.d;
$(tmpArg);
`````
