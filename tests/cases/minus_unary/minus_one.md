# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-(-1));
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = -(-1);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 1;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
