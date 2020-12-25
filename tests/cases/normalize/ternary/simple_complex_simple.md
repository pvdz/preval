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

## Output

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryConsequent_1;
const a = 1 ? ((tmpTernaryConsequent = $(2)), tmpTernaryConsequent) : 3;
const b = 0 ? ((tmpTernaryConsequent_1 = $(4)), tmpTernaryConsequent_1) : 5;
$(a, b);
`````
