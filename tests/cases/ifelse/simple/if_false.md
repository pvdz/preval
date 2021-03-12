# Preval test case

# if_false.md

> Ifelse > Simple > If false
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (false) $();
`````

## Pre Normal

`````js filename=intro
if (false) $();
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
