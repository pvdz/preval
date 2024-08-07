# Preval test case

# minus_one.md

> Normalize > Templates > Static resolve > Arg > Minus one
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${-1}`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce(-1, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(-1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`-1`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "-1" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '-1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
