# Preval test case

# one.md

> Normalize > Unary > Minus > One
>
> Negative literals should be statically resolved where possible

#TODO

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

## PST Output

With rename=true

`````js filename=intro
$( -1 );
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
