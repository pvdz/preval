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
var tmpArg;
let x = 1;
x = x - 1;
tmpArg = x;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x = 8;
x = x * 8;
x = x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
let x = 1;
x = x - 1;
tmpArg = x;
$(tmpArg);
`````
