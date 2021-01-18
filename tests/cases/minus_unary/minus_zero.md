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

## Output

`````js filename=intro
var tmpArg;
tmpArg = 0;
$(tmpArg);
`````

## Result

Should call `$` with:
[[0], null];

Normalized calls: Same

Final output calls: Same
