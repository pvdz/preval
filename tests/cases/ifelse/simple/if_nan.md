# Preval test case

# if_nan.md

> Ifelse > Simple > If nan
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (NaN) $();
`````

## Pre Normal

`````js filename=intro
if (NaN) $();
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
