# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~(-1));
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = ~-1;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 0;
$(tmpArg);
`````
