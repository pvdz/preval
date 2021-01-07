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
var tmpArg;
let x = 1;
x = x + 1;
tmpArg = x;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
let x = 1;
x = x + 1;
tmpArg = x;
$(tmpArg);
`````
