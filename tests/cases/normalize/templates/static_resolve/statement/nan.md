# Preval test case

# nan.md

> Normalize > Templates > Static resolve > Statement > Nan
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
`${NaN}`;
`````

## Pre Normal


`````js filename=intro
`` + $coerce(NaN, `string`) + ``;
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(NaN, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
$coerce(tmpBinLhs, `plustr`);
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

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
