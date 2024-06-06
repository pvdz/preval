# Preval test case

# charcodeat_two.md

> Type tracked > String constructor > Charcodeat two
>
> Should try to inline the charCodeAt call 

#TODO

## Input

`````js filename=intro
$(String.fromCharCode(80, 70));
`````

## Pre Normal


`````js filename=intro
$(String.fromCharCode(80, 70));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = String.fromCharCode(80, 70);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`PF`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "PF" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'PF'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
