# Preval test case

# arr_empty.md

> Normalize > Templates > Static resolve > Statement > Arr empty
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
`${[]}`;
`````

## Pre Normal


`````js filename=intro
`` + $coerce([], `string`) + ``;
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpCallCallee = [];
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
