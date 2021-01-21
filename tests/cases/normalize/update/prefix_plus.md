# Preval test case

# prefix_plus.md

> normalize > update > prefix_plus
>
> Update expressions should be transformed to regular binary expression assignments

#TODO

## Input

`````js filename=intro
let x = 1;
$(++x);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
let x = 1;
tmpNestedComplexRhs = x + 1;
x = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
let x = 1;
tmpNestedComplexRhs = x + 1;
x = tmpNestedComplexRhs;
tmpArg = tmpNestedComplexRhs;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: undefined

Normalized calls: Same

Final output calls: Same
