# Preval test case

# argless.md

> Global casting > String > Argless
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const y = String();
$(y);
`````

## Pre Normal


`````js filename=intro
const y = String();
$(y);
`````

## Normalized


`````js filename=intro
const y = ``;
$(y);
`````

## Output


`````js filename=intro
$(``);
`````

## PST Output

With rename=true

`````js filename=intro
$( "" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
