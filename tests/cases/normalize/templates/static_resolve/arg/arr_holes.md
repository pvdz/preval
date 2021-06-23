# Preval test case

# arr_holes.md

> Normalize > Templates > Static resolve > Arg > Arr holes
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${[1,,3]}`);
`````

## Pre Normal

`````js filename=intro
$(`` + String([1, , 3]) + ``);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpCallCallee$1 = String;
const tmpCalleeParam$1 = [1, , 3];
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + ``;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`1,,3`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1,,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
