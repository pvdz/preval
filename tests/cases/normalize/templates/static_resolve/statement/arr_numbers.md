# Preval test case

# arr_numbers.md

> Normalize > Templates > Static resolve > Statement > Arr numbers
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${[1,2,3]}`;
`````

## Pre Normal

`````js filename=intro
`` + String([1, 2, 3]) + ``;
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpCallCallee = String;
const tmpCalleeParam = [1, 2, 3];
const tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
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
