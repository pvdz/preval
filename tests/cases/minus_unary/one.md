# Preval test case

# one.md

> Minus unary > One
>
> Literals with a minus unary coerced to a negative number (or positive if the arg is negative)

## Input

`````js filename=intro
$(-1);
`````

## Pre Normal

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

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
