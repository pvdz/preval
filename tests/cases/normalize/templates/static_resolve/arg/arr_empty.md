# Preval test case

# arr_empty.md

> Normalize > Templates > Static resolve > Arg > Arr empty
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${[]}`);
`````

## Pre Normal

`````js filename=intro
$('' + [] + '');
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = '';
const tmpBinBothRhs = [];
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + '';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = [];
const tmpBinLhs = '' + tmpBinBothRhs;
$(tmpBinLhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
