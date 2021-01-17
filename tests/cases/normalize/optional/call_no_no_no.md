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
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
var tmpMemberComplexObj_2;
const a = {};
tmpMemberComplexObj_2 = a();
tmpMemberComplexObj_1 = tmpMemberComplexObj_2.b();
tmpMemberComplexObj = tmpMemberComplexObj_1.c();
tmpArg = tmpMemberComplexObj.d;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpMemberComplexObj;
var tmpMemberComplexObj_1;
var tmpMemberComplexObj_2;
const a = {};
tmpMemberComplexObj_2 = a();
tmpMemberComplexObj_1 = tmpMemberComplexObj_2.b();
tmpMemberComplexObj = tmpMemberComplexObj_1.c();
tmpArg = tmpMemberComplexObj.d;
$(tmpArg);
`````
