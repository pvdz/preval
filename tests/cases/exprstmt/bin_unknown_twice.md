# Preval test case

# bin_unknown_twice.md

> Exprstmt > Bin unknown twice
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
implicit1 + implicit2;
`````

## Pre Normal


`````js filename=intro
implicit1 + implicit2;
`````

## Normalized


`````js filename=intro
implicit1 + implicit2;
`````

## Output


`````js filename=intro
implicit1 + implicit2;
`````

## PST Output

With rename=true

`````js filename=intro
implicit1 + implicit2;
`````

## Globals

BAD@! Found 2 implicit global bindings:

implicit1, implicit2

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
