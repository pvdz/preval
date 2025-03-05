# Preval test case

# string_checked.md

> Normalize > Templates > Static resolve > Statement > String checked
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${"why"}`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce(`why`, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(`why`, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`why`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "why" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'why'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
