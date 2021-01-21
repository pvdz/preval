# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof 0);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = typeof 0;
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
