# Preval test case

# min_true.md

> plusmin > min_true
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-(-true));
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpUnaryArg;
tmpUnaryArg = -true;
tmpArg = -tmpUnaryArg;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpUnaryArg;
tmpUnaryArg = -1;
tmpArg = -tmpUnaryArg;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
