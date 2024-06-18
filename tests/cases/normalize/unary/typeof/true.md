# Preval test case

# true.md

> Normalize > Unary > Typeof > True
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof true);
`````

## Pre Normal


`````js filename=intro
$(typeof true);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `boolean`;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`boolean`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "boolean" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
