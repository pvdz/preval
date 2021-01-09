# Preval test case

# min_undefined.md

> plusmin > min_undefined
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-undefined);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = -undefined;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = -x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = NaN;
$(tmpArg);
`````
