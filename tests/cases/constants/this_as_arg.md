# Preval test case

# this_as_arg.md

> Constants > This as arg
>
> A constant set to null should be eliminated

Note: in strict mode this in global is gonna be bad.

## Input

`````js filename=intro
$(this);
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
