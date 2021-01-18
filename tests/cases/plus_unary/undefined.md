# Preval test case

# plus_undefined.md

> plusmin > plus_undefined
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+undefined);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = +undefined;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = NaN;
$(tmpArg);
`````

## Result

Should call `$` with:
[[null], null];

Normalized calls: Same

Final output calls: Same
