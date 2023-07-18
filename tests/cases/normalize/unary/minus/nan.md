# Preval test case

# nan.md

> Normalize > Unary > Minus > Nan
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-NaN);
`````

## Pre Normal

`````js filename=intro
$(-NaN);
`````

## Normalized

`````js filename=intro
$(NaN);
`````

## Output

`````js filename=intro
$(NaN);
`````

## PST Output

With rename=true

`````js filename=intro
$( NaN );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
