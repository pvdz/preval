# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof -1);
`````

## Normalized

`````js filename=intro
var tmpArg;
tmpArg = typeof -1;
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
[['number'], null];

Normalized calls: Same

Final output calls: Same
