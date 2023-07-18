# Preval test case

# null.md

> Normalize > Call > Primitive args > Null
>
> Primitive args that may need to be simplified

#TODO

## Input

`````js filename=intro
$(null);
`````

## Pre Normal

`````js filename=intro
$(null);
`````

## Normalized

`````js filename=intro
$(null);
`````

## Output

`````js filename=intro
$(null);
`````

## PST Output

With rename=true

`````js filename=intro
$( null );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
