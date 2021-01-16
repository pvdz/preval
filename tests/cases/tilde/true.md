# Preval test case

# min_true.md

> plusmin > min_true
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~true);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = ~true;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = -2;
$(tmpArg);
`````
