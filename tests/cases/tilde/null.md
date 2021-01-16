# Preval test case

# min_null.md

> plusmin > min_null
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~null);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = ~null;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = -1;
$(tmpArg);
`````
