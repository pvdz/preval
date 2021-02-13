# Preval test case

# plus_eq.md

> normalize > compound > plus_eq
>
> Compound assignments should be decomposed. This means fewer cases to worry about. We can recompose them in the last step.

#TODO

## Input

`````js filename=intro
let a = $(1);
var x = a += $(2);
$(x);
`````

## Normalized

`````js filename=intro
var x;
let a = $(1);
const tmpNestedCompoundLhs = a;
const tmpBinBothLhs = tmpNestedCompoundLhs;
const tmpBinBothRhs = $(2);
const tmpNestedComplexRhs = tmpBinBothLhs + tmpBinBothRhs;
a = tmpNestedComplexRhs;
x = tmpNestedComplexRhs;
$(x);
`````

## Output

`````js filename=intro
var x;
let a = $(1);
const tmpNestedCompoundLhs = a;
const tmpBinBothRhs = $(2);
const tmpNestedComplexRhs = tmpNestedCompoundLhs + tmpBinBothRhs;
a = tmpNestedComplexRhs;
x = tmpNestedComplexRhs;
$(x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
