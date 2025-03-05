# Preval test case

# undefined.md

> Normalize > Templates > Static resolve > Arg > Undefined
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${undefined}`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce(undefined, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(undefined, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`undefined`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "undefined" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
