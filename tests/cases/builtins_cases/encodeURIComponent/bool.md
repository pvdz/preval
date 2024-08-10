# Preval test case

# bool.md

> Builtins cases > EncodeURIComponent > Bool
>
>

## Input

`````js filename=intro
$(encodeURIComponent(true));
`````

## Pre Normal


`````js filename=intro
$(encodeURIComponent(true));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = encodeURIComponent(true);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`true`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "true" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'true'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
