# Preval test case

# argless.md

> Global casting > Boolean > Argless
>
> Calling global constructors to cast when the call is redundant should be eliminated

#TODO

## Input

`````js filename=intro
const y = Boolean();
$(y);
`````

## Pre Normal


`````js filename=intro
const y = Boolean();
$(y);
`````

## Normalized


`````js filename=intro
const y = false;
$(y);
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
