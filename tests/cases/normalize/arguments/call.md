# Preval test case

# call.md

> Normalize > Arguments > Call
>
> Normalizing call args when they are not identifier or literal

#TODO

## Input

`````js filename=intro
$($());
`````

## Pre Normal


`````js filename=intro
$($());
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = $();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
