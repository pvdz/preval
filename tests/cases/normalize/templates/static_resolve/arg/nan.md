# Preval test case

# nan.md

> Normalize > Templates > Static resolve > Arg > Nan
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${NaN}`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce(NaN, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(NaN, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`NaN`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "NaN" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'NaN'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
