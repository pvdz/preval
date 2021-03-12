# Preval test case

# date.md

> Exprstmt > Date
>
> Date as ident statement can be eliminated

## Input

`````js filename=intro
Date;
`````

## Pre Normal

`````js filename=intro
Date;
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
