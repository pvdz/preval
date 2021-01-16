# Preval test case

# min_false.md

> plusmin > min_false
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof false)
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = typeof false;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'boolean';
$(tmpArg);
`````
