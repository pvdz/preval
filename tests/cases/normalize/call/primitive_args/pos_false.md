# Preval test case

# pos_false.md

> Normalize > Call > Primitive args > Pos false
>
> Primitive args that may need to be simplified

## Input

`````js filename=intro
$(+false);
`````

## Pre Normal


`````js filename=intro
$(+false);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = 0;
$(tmpCalleeParam);
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
