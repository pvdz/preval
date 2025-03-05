# Preval test case

# void.md

> Normalize > Unary > Typeof > Void
>
> Typeof always returns a string

## Input

`````js filename=intro
$(typeof void $(100));
`````

## Pre Normal


`````js filename=intro
$(typeof void $(100));
`````

## Normalized


`````js filename=intro
$(100);
const tmpCalleeParam = `undefined`;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(100);
$(`undefined`);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( "undefined" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
