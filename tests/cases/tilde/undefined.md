# Preval test case

# min_undefined.md

> plusmin > min_undefined
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~undefined);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = ~undefined;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = typeof x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = -1;
$(tmpArg);
`````
