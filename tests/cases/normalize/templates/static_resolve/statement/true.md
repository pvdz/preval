# Preval test case

# true.md

> Normalize > Templates > Static resolve > Statement > True
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${true}`;
`````

## Pre Normal

`````js filename=intro
`${true}`;
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
