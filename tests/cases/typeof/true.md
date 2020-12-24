# Preval test case

# min_true.md

> plusmin > min_true
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof true);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = typeof true;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'boolean';
$(tmpArg);
`````
