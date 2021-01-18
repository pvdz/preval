# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+(-1));
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = +-1;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = -1;
$(tmpArg);
`````

## Result

Should call `$` with:
[[-1], null];

Normalized calls: Same

Final output calls: Same
