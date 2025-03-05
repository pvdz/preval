# Preval test case

# minus_nan.md

> Normalize > Unary > Plus > Minus nan
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(+(-NaN));
`````

## Pre Normal


`````js filename=intro
$(+-NaN);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = NaN;
$(tmpCalleeParam);
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
