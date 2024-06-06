# Preval test case

# dec.md

> Normalize > Number > Dec
>
> Numbers should be printed as decimals. Because. Yes.

#TODO

## Input

`````js filename=intro
$(1e10);
$(1e1000);
`````

## Pre Normal


`````js filename=intro
$(10000000000);
$(Infinity);
`````

## Normalized


`````js filename=intro
$(10000000000);
$(Infinity);
`````

## Output


`````js filename=intro
$(10000000000);
$(Infinity);
`````

## PST Output

With rename=true

`````js filename=intro
$( 10000000000 );
$( Infinity );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10000000000
 - 2: Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
