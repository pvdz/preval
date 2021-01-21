# Preval test case

# min_false.md

> plusmin > min_false
>
> Inlining `~` when we know something is a literal

## Input

`````js filename=intro
$(~false)
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = ~false;
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
 - 0: -1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
