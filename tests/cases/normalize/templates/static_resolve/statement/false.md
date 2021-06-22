# Preval test case

# false.md

> Normalize > Templates > Static resolve > Statement > False
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${false}`;
`````

## Pre Normal

`````js filename=intro
`` + String(false) + ``;
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `false`;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
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
