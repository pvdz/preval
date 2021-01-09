# Preval test case

# call_no_yes_yes.md

> normalize > optional > call_no_yes_yes
>
> Mix optional with regular member call

#TODO

## Input

`````js filename=intro
const a = {};
$(a().b?.().c?.().d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpOptionalChaining_2;
var tmpOptionalChaining_3;
var tmpComplexMemberObj;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
var tmpTernaryTest_3;
var tmpTernaryAlternate_3;
const a = {};
tmpComplexMemberObj = a();
tmpOptionalChaining_3 = tmpComplexMemberObj.b;
tmpTernaryTest = tmpOptionalChaining_3 == null;
tmpOptionalChaining_2 = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = tmpOptionalChaining_3()), tmpTernaryAlternate);
tmpTernaryTest_1 = tmpOptionalChaining_2 == null;
tmpOptionalChaining_1 = tmpTernaryTest_1 ? undefined : ((tmpTernaryAlternate_1 = tmpOptionalChaining_2.c), tmpTernaryAlternate_1);
tmpTernaryTest_2 = tmpOptionalChaining_1 == null;
tmpOptionalChaining = tmpTernaryTest_2 ? undefined : ((tmpTernaryAlternate_2 = tmpOptionalChaining_1()), tmpTernaryAlternate_2);
tmpTernaryTest_3 = tmpOptionalChaining == null;
tmpArg = tmpTernaryTest_3 ? undefined : ((tmpTernaryAlternate_3 = tmpOptionalChaining.d), tmpTernaryAlternate_3);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpOptionalChaining_2;
var tmpOptionalChaining_3;
var tmpComplexMemberObj;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
var tmpTernaryTest_3;
var tmpTernaryAlternate_3;
const a = {};
tmpComplexMemberObj = a();
tmpOptionalChaining_3 = tmpComplexMemberObj.b;
tmpTernaryTest = tmpOptionalChaining_3 == null;
tmpOptionalChaining_2 = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = tmpOptionalChaining_3()), tmpTernaryAlternate);
tmpTernaryTest_1 = tmpOptionalChaining_2 == null;
tmpOptionalChaining_1 = tmpTernaryTest_1 ? undefined : ((tmpTernaryAlternate_1 = tmpOptionalChaining_2.c), tmpTernaryAlternate_1);
tmpTernaryTest_2 = tmpOptionalChaining_1 == null;
tmpOptionalChaining = tmpTernaryTest_2 ? undefined : ((tmpTernaryAlternate_2 = tmpOptionalChaining_1()), tmpTernaryAlternate_2);
tmpTernaryTest_3 = tmpOptionalChaining == null;
tmpArg = tmpTernaryTest_3 ? undefined : ((tmpTernaryAlternate_3 = tmpOptionalChaining.d), tmpTernaryAlternate_3);
$(tmpArg);
`````