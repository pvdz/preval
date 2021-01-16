# Preval test case

# min_undefined.md

> plusmin > min_undefined
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof undefined);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = typeof undefined;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'undefined';
$(tmpArg);
`````
