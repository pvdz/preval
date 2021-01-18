# Preval test case

# plus_null.md

> plusmin > plus_null
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+null);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = +null;
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
