# Preval test case

# string.md

> Normalize > Unary > Typeof > String
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof "foo");
`````

## Pre Normal


`````js filename=intro
$(typeof `foo`);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `string`;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`string`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "string" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
