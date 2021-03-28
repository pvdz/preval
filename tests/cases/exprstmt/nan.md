# Preval test case

# nan.md

> Exprstmt > Nan
>
> Nulls as statement can be eliminated

## Input

`````js filename=intro
NaN;
`````

## Pre Normal

`````js filename=intro
NaN;
`````

## Normalized

`````js filename=intro

`````

## Output

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
