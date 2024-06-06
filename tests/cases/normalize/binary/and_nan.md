# Preval test case

# and_nan.md

> Normalize > Binary > And nan
>
> Bitwise ops coerce their arg

#TODO

## Input

`````js filename=intro
const a = $(100);
const b = a | NaN; // This should normalize to 0 and then be eliminated
$(a);
`````

## Pre Normal


`````js filename=intro
const a = $(100);
const b = a | NaN;
$(a);
`````

## Normalized


`````js filename=intro
const a = $(100);
const b = a | 0;
$(a);
`````

## Output


`````js filename=intro
const a = $(100);
a ** 0;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
a ** 0;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
