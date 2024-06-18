# Preval test case

# arr_holes.md

> Normalize > Templates > Static resolve > Statement > Arr holes
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
`${[1,,3]}`;
`````

## Pre Normal


`````js filename=intro
`` + $coerce([1, , 3], `string`) + ``;
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpCallCallee = [1, , 3];
const tmpBinBothRhs = $coerce(tmpCallCallee, `string`);
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
