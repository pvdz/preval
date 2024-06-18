# Preval test case

# false.md

> Normalize > Unary > Typeof > False
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof false);
`````

## Pre Normal


`````js filename=intro
$(typeof false);
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
