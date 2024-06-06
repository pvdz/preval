# Preval test case

# undefined.md

> Plus unary > Undefined
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+undefined);
`````

## Pre Normal


`````js filename=intro
$(+undefined);
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
