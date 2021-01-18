# Preval test case

# plus_regex.md

> plusmin > plus_regex
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+/1/);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = +/1/;
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
