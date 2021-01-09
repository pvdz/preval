# Preval test case

# prop_yes_yes_no.md

> normalize > nullish > prop_yes_yes_no
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a??b??c.d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryTest_1;
var tmpTernaryConsequent;
const a = {};
a = a;
tmpTernaryTest = a == null;
tmpNullish = tmpTernaryTest ? b : a;
tmpTernaryTest_1 = tmpNullish == null;
tmpArg = tmpTernaryTest_1 ? ((tmpTernaryConsequent = c.d), tmpTernaryConsequent) : tmpNullish;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNullish;
var tmpTernaryTest;
var tmpTernaryTest_1;
var tmpTernaryConsequent;
const a = {};
a = a;
tmpTernaryTest = a == null;
tmpNullish = tmpTernaryTest ? b : a;
tmpTernaryTest_1 = tmpNullish == null;
tmpArg = tmpTernaryTest_1 ? ((tmpTernaryConsequent = c.d), tmpTernaryConsequent) : tmpNullish;
$(tmpArg);
`````
