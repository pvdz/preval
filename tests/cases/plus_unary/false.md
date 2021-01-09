# Preval test case

# plus_false.md

> plusmin > plus_false
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+false);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = +false;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = typeof false;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 0;
$(tmpArg);
`````
