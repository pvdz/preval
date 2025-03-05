# Preval test case

# infinity.md

> Normalize > Unary > Typeof > Infinity
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof Infinity);
`````

## Pre Normal


`````js filename=intro
$(typeof Infinity);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `number`;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`number`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "number" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
