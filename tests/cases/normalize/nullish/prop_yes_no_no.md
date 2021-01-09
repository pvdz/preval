# Preval test case

# prop_yes_no_no.md

> normalize > nullish > prop_yes_no_no
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a??b.c.d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpComplexMemberObj;
const a = {};
a = a;
tmpTernaryTest = a == null;
tmpArg = tmpTernaryTest ? ((tmpComplexMemberObj = b.c), (tmpTernaryConsequent = tmpComplexMemberObj.d), tmpTernaryConsequent) : a;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x = {};
x = x;
x = x * x;
x = x ? ((x = x.x), (x = x.x), x) : x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpComplexMemberObj;
const a = {};
a = a;
tmpTernaryTest = a == null;
tmpArg = tmpTernaryTest ? ((tmpComplexMemberObj = b.c), (tmpTernaryConsequent = tmpComplexMemberObj.d), tmpTernaryConsequent) : a;
$(tmpArg);
`````
