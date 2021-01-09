# Preval test case

# complex_complex_simple.md

> normalize > ternary > complex_complex_simple
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = $(1) ? $(2) : 3
const b = $(0) ? $(4) : 5
$(a, b)
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
tmpTernaryTest = $(1);
const a = tmpTernaryTest ? ((tmpTernaryConsequent = $(2)), tmpTernaryConsequent) : 3;
tmpTernaryTest_1 = $(0);
const b = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $(4)), tmpTernaryConsequent_1) : 5;
$(a, b);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
x = x(8);
var x = x ? ((x = x(8)), x) : 8;
x = x(8);
var x = x ? ((x = x(8)), x) : 8;
x(x, x);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
tmpTernaryTest = $(1);
const a = tmpTernaryTest ? ((tmpTernaryConsequent = $(2)), tmpTernaryConsequent) : 3;
tmpTernaryTest_1 = $(0);
const b = tmpTernaryTest_1 ? ((tmpTernaryConsequent_1 = $(4)), tmpTernaryConsequent_1) : 5;
$(a, b);
`````
