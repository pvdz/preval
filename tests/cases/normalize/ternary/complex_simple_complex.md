# Preval test case

# complex_simple_complex.md

> normalize > ternary > complex_simple_complex
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = $(1) ? 2 : $(3)
const b = $(0) ? 4 : $(5)
$(a, b)
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
tmpTernaryTest = $(1);
const a = tmpTernaryTest ? 2 : ((tmpTernaryAlternate = $(3)), tmpTernaryAlternate);
tmpTernaryTest_1 = $(0);
const b = tmpTernaryTest_1 ? 4 : ((tmpTernaryAlternate_1 = $(5)), tmpTernaryAlternate_1);
$(a, b);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpTernaryTest_1;
var tmpTernaryAlternate_1;
tmpTernaryTest = $(1);
const a = tmpTernaryTest ? 2 : ((tmpTernaryAlternate = $(3)), tmpTernaryAlternate);
tmpTernaryTest_1 = $(0);
const b = tmpTernaryTest_1 ? 4 : ((tmpTernaryAlternate_1 = $(5)), tmpTernaryAlternate_1);
$(a, b);
`````
