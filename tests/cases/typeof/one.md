# Preval test case

# min_one.md

> plusmin > min_one
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof 1);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = typeof 1;
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 'number';
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: "number"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
