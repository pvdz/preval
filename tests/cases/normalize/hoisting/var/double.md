# Preval test case

# double.md

> normalize > hoisting > var > double
>
> Duplicate var statements is legit but we should drop the duplicate version

#TODO

## Input

`````js filename=intro
var x = 1;
var x = 2;
$(x);
`````

## Normalized

`````js filename=intro
var x;
var x;
x = 1;
x = 2;
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x = 8;
var x = 8;
x(x);
`````

## Output

`````js filename=intro
var x;
var x;
x = 1;
x = 2;
$(x);
`````
