# Preval test case

# charcodeat_noargs.md

> Type tracked > String constructor > Charcodeat noargs
>
> Should try to inline the charCodeAt call

## Input

`````js filename=intro
$(String.fromCharCode());
`````

## Pre Normal


`````js filename=intro
$(String.fromCharCode());
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $String_fromCharCode();
$(tmpCalleeParam);
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
