# Preval test case

# complex_complex_complex.md

> normalize > ternary > complex_complex_complex
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = $(1) ? $(2) : $(3)
const b = $(0) ? $(4) : $(5)
$(a, b)
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
var tmpTernaryAlternate_1;
tmpTernaryTest = $(1);
const a = tmpTernaryTest ? ((tmpTernaryConsequent = $(2)), tmpTernaryConsequent) : ((tmpTernaryAlternate = $(3)), tmpTernaryAlternate);
tmpTernaryTest_1 = $(0);
const b = tmpTernaryTest_1
  ? ((tmpTernaryConsequent_1 = $(4)), tmpTernaryConsequent_1)
  : ((tmpTernaryAlternate_1 = $(5)), tmpTernaryAlternate_1);
$(a, b);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
x = x(8);
var x = x ? ((x = x(8)), x) : ((x = x(8)), x);
x = x(8);
var x = x ? ((x = x(8)), x) : ((x = x(8)), x);
x(x, x);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryConsequent_1;
var tmpTernaryAlternate_1;
tmpTernaryTest = $(1);
const a = tmpTernaryTest ? ((tmpTernaryConsequent = $(2)), tmpTernaryConsequent) : ((tmpTernaryAlternate = $(3)), tmpTernaryAlternate);
tmpTernaryTest_1 = $(0);
const b = tmpTernaryTest_1
  ? ((tmpTernaryConsequent_1 = $(4)), tmpTernaryConsequent_1)
  : ((tmpTernaryAlternate_1 = $(5)), tmpTernaryAlternate_1);
$(a, b);
`````
