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

## Output

`````js filename=intro
var tmpArg;
var tmpUnaryArg;
tmpUnaryArg = -0;
tmpArg = -tmpUnaryArg;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
