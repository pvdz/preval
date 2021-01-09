# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-(-0));
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = -(-0);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = -(-8);
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 0;
$(tmpArg);
`````
