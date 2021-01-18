# Preval test case

# min_one.md

> plusmin > min_one
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~1);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = ~1;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = -2;
$(tmpArg);
`````

## Result

Should call `$` with:
[[-2], null];

Normalized calls: Same

Final output calls: Same
