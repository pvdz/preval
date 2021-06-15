# Preval test case

# infinity.md

> Normalize > Templates > Static resolve > Statement > Infinity
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${Infinity}`;
`````

## Pre Normal

`````js filename=intro
`` + Infinity + ``;
`````

## Normalized

`````js filename=intro
const tmpBinLhs = `Infinity`;
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
