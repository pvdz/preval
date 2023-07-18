# Preval test case

# undefined.md

> Normalize > Call > Primitive args > Undefined
>
> Primitive args that may need to be simplified

#TODO

## Input

`````js filename=intro
$(undefined);
`````

## Pre Normal

`````js filename=intro
$(undefined);
`````

## Normalized

`````js filename=intro
$(undefined);
`````

## Output

`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
