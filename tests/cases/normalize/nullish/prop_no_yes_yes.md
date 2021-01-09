# Preval test case

# prop_no_yes_yes.md

> normalize > nullish > prop_no_yes_yes
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b??c??d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpNullish_1;
var tmpTernaryTest;
var tmpTernaryTest_1;
const a = {};
tmpNullish_1 = a.b;
tmpTernaryTest = tmpNullish_1 == null;
tmpNullish = tmpTernaryTest ? c : tmpNullish_1;
tmpTernaryTest_1 = tmpNullish == null;
tmpArg = tmpTernaryTest_1 ? d : tmpNullish;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpNullish_1;
var tmpTernaryTest;
var tmpTernaryTest_1;
const a = {};
tmpNullish_1 = a.b;
tmpTernaryTest = tmpNullish_1 == null;
tmpNullish = tmpTernaryTest ? c : tmpNullish_1;
tmpTernaryTest_1 = tmpNullish == null;
tmpArg = tmpTernaryTest_1 ? d : tmpNullish;
$(tmpArg);
`````
