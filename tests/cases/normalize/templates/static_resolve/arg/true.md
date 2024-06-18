# Preval test case

# true.md

> Normalize > Templates > Static resolve > Arg > True
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${true}`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce(true, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(true, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`true`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "true" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'true'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
