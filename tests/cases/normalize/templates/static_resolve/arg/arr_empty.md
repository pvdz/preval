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
$(`` + $coerce([], `string`) + ``);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpCallCallee$1 = [];
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(``);
`````

## PST Output

With rename=true

`````js filename=intro
$( "" );
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
