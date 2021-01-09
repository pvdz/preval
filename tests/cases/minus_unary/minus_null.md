# Preval test case

# min_null.md

> plusmin > min_null
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-(-null));
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpUnaryArg;
tmpUnaryArg = -null;
tmpArg = -tmpUnaryArg;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = -/regex/;
x = -x;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpUnaryArg;
tmpUnaryArg = -0;
tmpArg = -tmpUnaryArg;
$(tmpArg);
`````
