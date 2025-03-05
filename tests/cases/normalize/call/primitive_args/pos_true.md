# Preval test case

# pos_true.md

> Normalize > Call > Primitive args > Pos true
>
> Primitive args that may need to be simplified

## Input

`````js filename=intro
$(+true);
`````

## Pre Normal


`````js filename=intro
$(+true);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = 1;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
