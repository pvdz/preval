# Preval test case

# min_null.md

> plusmin > min_null
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-null);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = -null;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = -0;
$(tmpArg);
`````

## Result

Should call `$` with:
[[0], null];

Normalized calls: Same

Final output calls: Same
