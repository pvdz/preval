# Preval test case

# arr_numbers.md

> Normalize > Templates > Static resolve > Arg > Arr numbers
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${[1,2,3]}`);
`````

## Pre Normal

`````js filename=intro
$('' + [1, 2, 3] + '');
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = '';
const tmpBinBothRhs = [1, 2, 3];
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + '';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = [1, 2, 3];
const tmpBinLhs = '' + tmpBinBothRhs;
$(tmpBinLhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '1,2,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
