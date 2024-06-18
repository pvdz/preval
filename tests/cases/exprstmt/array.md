# Preval test case

# array.md

> Exprstmt > Array
>
> Arrays without side-effects as statement can be eliminated

## Input

`````js filename=intro
[1,2,3];
`````

## Pre Normal


`````js filename=intro
[1, 2, 3];
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
