# Preval test case

# minus_zero.md

> Normalize > Templates > Static resolve > Statement > Minus zero
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
`${-0}`;
`````

## Pre Normal


`````js filename=intro
`` + $coerce(-0, `string`) + ``;
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(-0, `string`);
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
