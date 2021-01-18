# Preval test case

# plus_true.md

> plusmin > plus_true
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+true);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = +true;
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
[[1], null];

Normalized calls: Same

Final output calls: Same
