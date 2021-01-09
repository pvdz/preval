# Preval test case

# min_false.md

> plusmin > min_false
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

Note: the -0 is observable. Object.is(0, !false) -> false

## Input

`````js filename=intro
$(-(-false))
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpUnaryArg;
tmpUnaryArg = -false;
tmpArg = -tmpUnaryArg;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = -false;
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
