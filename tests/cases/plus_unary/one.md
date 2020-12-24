# Preval test case

# plus_one.md

> plusmin > plus_one
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+1);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = +1;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 1;
$(tmpArg);
`````
