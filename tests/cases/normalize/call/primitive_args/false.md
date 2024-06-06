# Preval test case

# false.md

> Normalize > Call > Primitive args > False
>
> Primitive args that may need to be simplified

#TODO

## Input

`````js filename=intro
$(false);
`````

## Pre Normal


`````js filename=intro
$(false);
`````

## Normalized


`````js filename=intro
$(false);
`````

## Output


`````js filename=intro
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
$( false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
