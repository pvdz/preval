# Preval test case

# prop_yes_yes_yes.md

> normalize > nullish > prop_yes_yes_yes
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a??b??c??d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpNullish_1;
var tmpTernaryTest;
var tmpTernaryTest_1;
var tmpTernaryTest_2;
const a = {};
a = a;
tmpTernaryTest = a == null;
tmpNullish_1 = tmpTernaryTest ? b : a;
tmpTernaryTest_1 = tmpNullish_1 == null;
tmpNullish = tmpTernaryTest_1 ? c : tmpNullish_1;
tmpTernaryTest_2 = tmpNullish == null;
tmpArg = tmpTernaryTest_2 ? d : tmpNullish;
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
var x = {};
x = x;
x = x * x;
x = x ? x : x;
x = x * x;
x = x ? x : x;
x = x * x;
x = x ? x : x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpNullish_1;
var tmpTernaryTest;
var tmpTernaryTest_1;
var tmpTernaryTest_2;
const a = {};
a = a;
tmpTernaryTest = a == null;
tmpNullish_1 = tmpTernaryTest ? b : a;
tmpTernaryTest_1 = tmpNullish_1 == null;
tmpNullish = tmpTernaryTest_1 ? c : tmpNullish_1;
tmpTernaryTest_2 = tmpNullish == null;
tmpArg = tmpTernaryTest_2 ? d : tmpNullish;
$(tmpArg);
`````
