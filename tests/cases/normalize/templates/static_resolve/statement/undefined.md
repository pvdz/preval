# Preval test case

# undefined.md

> Normalize > Templates > Static resolve > Statement > Undefined
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
`${undefined}`;
`````

## Pre Normal


`````js filename=intro
`` + $coerce(undefined, `string`) + ``;
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(undefined, `string`);
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
