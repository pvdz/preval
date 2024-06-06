# Preval test case

# true.md

> Normalize > Call > Primitive args > True
>
> Primitive args that may need to be simplified

#TODO

## Input

`````js filename=intro
$(true);
`````

## Pre Normal


`````js filename=intro
$(true);
`````

## Normalized


`````js filename=intro
$(true);
`````

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
