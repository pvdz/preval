# Preval test case

# string.md

> Normalize > Templates > Static resolve > Arg > String
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${"why"}`);
`````

## Pre Normal

`````js filename=intro
$(`` + String(`why`) + ``);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `why`;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + ``;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`why`);
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
