# Preval test case

# minus_typeof_x.md

> Normalize > Unary > Minus > Minus typeof x
>
> Negative literals should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(-(typeof $));
`````

## Pre Normal


`````js filename=intro
$(-typeof $);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = NaN;
tmpCallCallee(tmpCalleeParam);
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
