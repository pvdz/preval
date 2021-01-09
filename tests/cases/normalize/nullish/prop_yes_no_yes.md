# Preval test case

# prop_yes_no_yes.md

> normalize > nullish > prop_yes_no_yes
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a??b.c??d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpTernaryTest_1;
const a = {};
a = a;
tmpTernaryTest = a == null;
tmpNullish = tmpTernaryTest ? ((tmpTernaryConsequent = b.c), tmpTernaryConsequent) : a;
tmpTernaryTest_1 = tmpNullish == null;
tmpArg = tmpTernaryTest_1 ? d : tmpNullish;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x = {};
x = x;
x = x * x;
x = x ? ((x = x.x), x) : x;
x = x * x;
x = x ? x : x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpTernaryTest_1;
const a = {};
a = a;
tmpTernaryTest = a == null;
tmpNullish = tmpTernaryTest ? ((tmpTernaryConsequent = b.c), tmpTernaryConsequent) : a;
tmpTernaryTest_1 = tmpNullish == null;
tmpArg = tmpTernaryTest_1 ? d : tmpNullish;
$(tmpArg);
`````
