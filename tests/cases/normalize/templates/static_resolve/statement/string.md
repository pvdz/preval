# Preval test case

# string.md

> Normalize > Templates > Static resolve > Statement > String
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
`${"why"}`;
`````

## Pre Normal


`````js filename=intro
`` + $coerce(`why`, `string`) + ``;
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(`why`, `string`);
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
