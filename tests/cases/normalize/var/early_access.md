# Preval test case

# early_access.md

> normalize > var > early_access
>
> Actual early access case

#TODO

## Input

`````js filename=intro
$(x); // We shouldn't break this being undefined
var x = 10; 
$(x);
`````

## Normalized

`````js filename=intro
var x;
$(x);
x = 10;
$(x);
`````

## Uniformed

`````js filename=intro
var x;
x(x);
var x = 8;
x(x);
`````

## Output

`````js filename=intro
var x;
$(x);
x = 10;
$(x);
`````
