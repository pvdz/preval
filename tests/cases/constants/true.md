# Preval test case

# true.md

> Constants > True
>
> A constant set to true should be eliminated

#TODO

## Input

`````js filename=intro
const x = true;
$(x);
`````

## Pre Normal


`````js filename=intro
const x = true;
$(x);
`````

## Normalized


`````js filename=intro
const x = true;
$(x);
`````

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
