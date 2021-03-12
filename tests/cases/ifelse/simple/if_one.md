# Preval test case

# if_one.md

> Ifelse > Simple > If one
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (1) $();
`````

## Pre Normal

`````js filename=intro
if (1) $();
`````

## Normalized

`````js filename=intro
$();
`````

## Output

`````js filename=intro
$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
