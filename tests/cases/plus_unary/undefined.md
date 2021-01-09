# Preval test case

# plus_undefined.md

> plusmin > plus_undefined
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+undefined);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = +undefined;
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
tmpArg = NaN;
$(tmpArg);
`````
