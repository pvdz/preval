# Preval test case

# computed_yes_yes_yes.md

> normalize > optional > computed_yes_yes_yes
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a?.[b]?.[c]?.[d]);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
const a = {};
tmpTernaryTest = a == null;
tmpOptionalChaining_1 = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = a[b]), tmpTernaryAlternate);
tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
tmpOptionalChaining = tmpTernaryTest_1 ? undefined : ((tmpTernaryAlternate_1 = tmpOptionalChaining_1[c]), tmpTernaryAlternate_1);
tmpTernaryTest_2 = tmpOptionalChaining == null;
tmpArg = tmpTernaryTest_2 ? undefined : ((tmpTernaryAlternate_2 = tmpOptionalChaining[d]), tmpTernaryAlternate_2);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
const a = {};
tmpTernaryTest = a == null;
tmpOptionalChaining_1 = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = a[b]), tmpTernaryAlternate);
tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
tmpOptionalChaining = tmpTernaryTest_1 ? undefined : ((tmpTernaryAlternate_1 = tmpOptionalChaining_1[c]), tmpTernaryAlternate_1);
tmpTernaryTest_2 = tmpOptionalChaining == null;
tmpArg = tmpTernaryTest_2 ? undefined : ((tmpTernaryAlternate_2 = tmpOptionalChaining[d]), tmpTernaryAlternate_2);
$(tmpArg);
`````
