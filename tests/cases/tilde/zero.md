# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~0);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = ~0;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = typeof 8;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = -1;
$(tmpArg);
`````
