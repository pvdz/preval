# Preval test case

# min_one.md

> plusmin > min_one
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-1);
`````

## Normalized

`````js filename=intro
$(-1);
`````

## Output

`````js filename=intro
$(-1);
`````

## Result

Should call `$` with:
[[-1], null];

Normalized calls: Same

Final output calls: Same
