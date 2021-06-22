# Preval test case

# string.md

> Normalize > Templates > Static resolve > Statement > String
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${"why"}`;
`````

## Pre Normal

`````js filename=intro
`` + String(`why`) + ``;
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `why`;
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
