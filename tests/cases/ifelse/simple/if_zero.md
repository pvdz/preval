# Preval test case

# if_zero.md

> Ifelse > Simple > If zero
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (0) $();
`````

## Pre Normal

`````js filename=intro
if (0) $();
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
