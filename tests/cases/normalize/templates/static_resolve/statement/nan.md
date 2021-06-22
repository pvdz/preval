# Preval test case

# nan.md

> Normalize > Templates > Static resolve > Statement > Nan
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${NaN}`;
`````

## Pre Normal

`````js filename=intro
`` + String(NaN) + ``;
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `NaN`;
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
