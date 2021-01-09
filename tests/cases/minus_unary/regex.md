# Preval test case

# min_regex.md

> plusmin > min_regex
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-/1/);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = -/1/;
$(tmpArg);
`````

## Uniformed

`````js filename=intro
var x;
x = -/regex/;
x(x);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = NaN;
$(tmpArg);
`````
