# Preval test case

# false.md

> Constants > False
>
> A constant set to false should be eliminated

## Input

`````js filename=intro
const x = false;
$(x);
`````

## Pre Normal


`````js filename=intro
const x = false;
$(x);
`````

## Normalized


`````js filename=intro
const x = false;
$(x);
`````

## Output


`````js filename=intro
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
$( false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
