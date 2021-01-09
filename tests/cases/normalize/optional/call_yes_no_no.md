# Preval test case

# call_yes_no_no.md

> normalize > optional > call_yes_no_no
>
> Mix optional with regular member call

#TODO

## Input

`````js filename=intro
const a = {};
$(a?.().b().c().d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpOptionalChaining_2;
var tmpOptionalChaining_3;
var tmpOptionalChaining_4;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
var tmpTernaryTest_3;
var tmpTernaryAlternate_3;
var tmpTernaryTest_4;
var tmpTernaryAlternate_4;
var tmpTernaryTest_5;
var tmpTernaryAlternate_5;
const a = {};
tmpTernaryTest = a == null;
tmpOptionalChaining_4 = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = a()), tmpTernaryAlternate);
tmpTernaryTest_1 = tmpOptionalChaining_4 == null;
tmpOptionalChaining_3 = tmpTernaryTest_1 ? undefined : ((tmpTernaryAlternate_1 = tmpOptionalChaining_4.b), tmpTernaryAlternate_1);
tmpTernaryTest_2 = tmpOptionalChaining_3 == null;
tmpOptionalChaining_2 = tmpTernaryTest_2 ? undefined : ((tmpTernaryAlternate_2 = tmpOptionalChaining_3()), tmpTernaryAlternate_2);
tmpTernaryTest_3 = tmpOptionalChaining_2 == null;
tmpOptionalChaining_1 = tmpTernaryTest_3 ? undefined : ((tmpTernaryAlternate_3 = tmpOptionalChaining_2.c), tmpTernaryAlternate_3);
tmpTernaryTest_4 = tmpOptionalChaining_1 == null;
tmpOptionalChaining = tmpTernaryTest_4 ? undefined : ((tmpTernaryAlternate_4 = tmpOptionalChaining_1()), tmpTernaryAlternate_4);
tmpTernaryTest_5 = tmpOptionalChaining == null;
tmpArg = tmpTernaryTest_5 ? undefined : ((tmpTernaryAlternate_5 = tmpOptionalChaining.d), tmpTernaryAlternate_5);
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
var x;
var x;
var x;
var x;
var x;
var x;
var x;
var x;
var x;
var x;
var x;
var x;
var x = {};
x = x * x;
x = x ? x : ((x = x()), x);
x = x * x;
x = x ? x : ((x = x.x), x);
x = x * x;
x = x ? x : ((x = x()), x);
x = x * x;
x = x ? x : ((x = x.x), x);
x = x * x;
x = x ? x : ((x = x()), x);
x = x * x;
x = x ? x : ((x = x.x), x);
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpOptionalChaining;
var tmpOptionalChaining_1;
var tmpOptionalChaining_2;
var tmpOptionalChaining_3;
var tmpOptionalChaining_4;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
var tmpTernaryTest_2;
var tmpTernaryAlternate_2;
var tmpTernaryTest_3;
var tmpTernaryAlternate_3;
var tmpTernaryTest_4;
var tmpTernaryAlternate_4;
var tmpTernaryTest_5;
var tmpTernaryAlternate_5;
const a = {};
tmpTernaryTest = a == null;
tmpOptionalChaining_4 = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = a()), tmpTernaryAlternate);
tmpTernaryTest_1 = tmpOptionalChaining_4 == null;
tmpOptionalChaining_3 = tmpTernaryTest_1 ? undefined : ((tmpTernaryAlternate_1 = tmpOptionalChaining_4.b), tmpTernaryAlternate_1);
tmpTernaryTest_2 = tmpOptionalChaining_3 == null;
tmpOptionalChaining_2 = tmpTernaryTest_2 ? undefined : ((tmpTernaryAlternate_2 = tmpOptionalChaining_3()), tmpTernaryAlternate_2);
tmpTernaryTest_3 = tmpOptionalChaining_2 == null;
tmpOptionalChaining_1 = tmpTernaryTest_3 ? undefined : ((tmpTernaryAlternate_3 = tmpOptionalChaining_2.c), tmpTernaryAlternate_3);
tmpTernaryTest_4 = tmpOptionalChaining_1 == null;
tmpOptionalChaining = tmpTernaryTest_4 ? undefined : ((tmpTernaryAlternate_4 = tmpOptionalChaining_1()), tmpTernaryAlternate_4);
tmpTernaryTest_5 = tmpOptionalChaining == null;
tmpArg = tmpTernaryTest_5 ? undefined : ((tmpTernaryAlternate_5 = tmpOptionalChaining.d), tmpTernaryAlternate_5);
$(tmpArg);
`````
