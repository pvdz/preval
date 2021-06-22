# Preval test case

# null.md

> Normalize > Templates > Static resolve > Statement > Null
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${null}`;
`````

## Pre Normal

`````js filename=intro
`` + String(null) + ``;
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `null`;
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
