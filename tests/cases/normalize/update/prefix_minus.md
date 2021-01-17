# Preval test case

# prefix_minus.md

> normalize > update > prefix_minus
>
> Update expressions should be transformed to regular binary expression assignments

#TODO

## Input

`````js filename=intro
let x = 1;
$(--x);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
let x = 1;
tmpNestedComplexRhs = x - 1;
x = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
let x = 1;
tmpNestedComplexRhs = x - 1;
x = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(tmpArg);
`````
