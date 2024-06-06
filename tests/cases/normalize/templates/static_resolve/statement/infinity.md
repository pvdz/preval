# Preval test case

# infinity.md

> Normalize > Templates > Static resolve > Statement > Infinity
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${Infinity}`;
`````

## Pre Normal


`````js filename=intro
`` + $coerce(Infinity, `string`) + ``;
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(Infinity, `string`);
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
