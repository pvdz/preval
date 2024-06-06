# Preval test case

# neg_neg_null.md

> Normalize > Call > Primitive args > Neg neg null
>
> Primitive args that may need to be simplified

#TODO

## Input

`````js filename=intro
$(-(-null));
`````

## Pre Normal


`````js filename=intro
$(-(-null));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 0;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(0);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
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
