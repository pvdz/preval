# Preval test case

# arr_holes.md

> Normalize > Templates > Static resolve > Arg > Arr holes
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${[1,,3]}`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce([1, , 3], `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpCallCallee$1 = [1, , 3];
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`1,,3`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "1,,3" );
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
