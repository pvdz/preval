# Preval test case

# charcodeat_one.md

> Type tracked > String constructor > Charcodeat one
>
> Should try to inline the charCodeAt call 

#TODO

## Input

`````js filename=intro
$(String.fromCharCode(80));
`````

## Pre Normal

`````js filename=intro
$(String.fromCharCode(80));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = String.fromCharCode(80);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`P`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "P" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'P'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
