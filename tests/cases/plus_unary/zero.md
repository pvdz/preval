# Preval test case

# plus_zero.md

> plusmin > plus_zero
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+0);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = +0;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 0;
$(tmpArg);
`````
