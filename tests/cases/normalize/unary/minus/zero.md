# Preval test case

# zero.md

> Normalize > Unary > Minus > Zero
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-0);
`````

## Pre Normal

`````js filename=intro
$(-0);
`````

## Normalized

`````js filename=intro
$(-0);
`````

## Output

`````js filename=intro
$(-0);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
