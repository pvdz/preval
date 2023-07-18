# Preval test case

# infinity.md

> Exprstmt > Infinity
>
> Nulls as statement can be eliminated

## Input

`````js filename=intro
Infinity;
`````

## Pre Normal

`````js filename=intro
Infinity;
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
