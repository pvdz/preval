# Preval test case

# if_null.md

> Ifelse > Simple > If null
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (null) $();
`````

## Pre Normal


`````js filename=intro
if (null) $();
`````

## Normalized


`````js filename=intro

`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
