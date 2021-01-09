# Preval test case

# simple_simple_complex.md

> normalize > ternary > simple_simple_complex
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = 1 ? 2 : $(3)
const b = 0 ? 4 : $(5)
$(a, b)
`````

## Normalized

`````js filename=intro
var tmpTernaryAlternate;
var tmpTernaryAlternate_1;
const a = 1 ? 2 : ((tmpTernaryAlternate = $(3)), tmpTernaryAlternate);
const b = 0 ? 4 : ((tmpTernaryAlternate_1 = $(5)), tmpTernaryAlternate_1);
$(a, b);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = 8 ? 8 : ((x = x(8)), x);
var x = 8 ? 8 : ((x = x(8)), x);
x(x, x);
`````

## Output

`````js filename=intro
var tmpTernaryAlternate;
var tmpTernaryAlternate_1;
const a = 1 ? 2 : ((tmpTernaryAlternate = $(3)), tmpTernaryAlternate);
const b = 0 ? 4 : ((tmpTernaryAlternate_1 = $(5)), tmpTernaryAlternate_1);
$(a, b);
`````
