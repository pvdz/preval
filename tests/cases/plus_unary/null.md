# Preval test case

# plus_null.md

> plusmin > plus_null
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+null);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = +null;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = typeof /regex/;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 0;
$(tmpArg);
`````
