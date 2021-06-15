# Preval test case

# one.md

> Normalize > Templates > Static resolve > Statement > One
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${1}`;
`````

## Pre Normal

`````js filename=intro
`` + 1 + ``;
`````

## Normalized

`````js filename=intro
const tmpBinLhs = `1`;
tmpBinLhs + ``;
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
