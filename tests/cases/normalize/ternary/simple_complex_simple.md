# Preval test case

# simple_complex_simple.md

> normalize > ternary > simple_complex_simple
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = 1 ? $(2) : 3
const b = 0 ? $(4) : 5
$(a, b)
`````

## Normalized

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryConsequent_1;
const a = 1 ? ((tmpTernaryConsequent = $(2)), tmpTernaryConsequent) : 3;
const b = 0 ? ((tmpTernaryConsequent_1 = $(4)), tmpTernaryConsequent_1) : 5;
$(a, b);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = 8 ? ((x = x(8)), x) : 8;
var x = 8 ? ((x = x(8)), x) : 8;
x(x, x);
`````

## Output

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryConsequent_1;
const a = 1 ? ((tmpTernaryConsequent = $(2)), tmpTernaryConsequent) : 3;
const b = 0 ? ((tmpTernaryConsequent_1 = $(4)), tmpTernaryConsequent_1) : 5;
$(a, b);
`````
