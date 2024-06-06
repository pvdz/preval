# Preval test case

# infinity.md

> Normalize > Unary > Minus > Infinity
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-Infinity);
`````

## Pre Normal


`````js filename=intro
$(-Infinity);
`````

## Normalized


`````js filename=intro
$(-Infinity);
`````

## Output


`````js filename=intro
$(-Infinity);
`````

## PST Output

With rename=true

`````js filename=intro
$( -Infinity );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
