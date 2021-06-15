# Preval test case

# arr_holes.md

> Normalize > Templates > Static resolve > Statement > Arr holes
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${[1,,3]}`;
`````

## Pre Normal

`````js filename=intro
`` + [1, , 3] + ``;
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = [1, , 3];
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
tmpBinLhs + ``;
`````

## Output

`````js filename=intro
const tmpBinBothRhs = [1, , 3];
`` + tmpBinBothRhs;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
