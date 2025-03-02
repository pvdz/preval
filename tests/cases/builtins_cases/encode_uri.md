# Preval test case

# encode_uri.md

> Src > Reduce static > Encode uri
>
> Some browser methods?

## Input

`````js filename=intro
const x = encodeURIComponent(true);
$(x);
`````

## Pre Normal


`````js filename=intro
const x = encodeURIComponent(true);
$(x);
`````

## Normalized


`````js filename=intro
const x = encodeURIComponent(true);
$(x);
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
