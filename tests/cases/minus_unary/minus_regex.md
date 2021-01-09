# Preval test case

# min_regex.md

> plusmin > min_regex
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-(-/1/));
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpUnaryArg;
tmpUnaryArg = -/1/;
tmpArg = -tmpUnaryArg;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpUnaryArg;
tmpUnaryArg = NaN;
tmpArg = -tmpUnaryArg;
$(tmpArg);
`````
