# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof -1);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = typeof -1;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = typeof -8;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'number';
$(tmpArg);
`````
