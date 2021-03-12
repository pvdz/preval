# Preval test case

# if_true.md

> Ifelse > Simple > If true
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (true) $();
`````

## Pre Normal

`````js filename=intro
if (true) $();
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
