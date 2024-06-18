# Preval test case

# null.md

> Normalize > Templates > Static resolve > Statement > Null
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
`${null}`;
`````

## Pre Normal


`````js filename=intro
`` + $coerce(null, `string`) + ``;
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(null, `string`);
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
