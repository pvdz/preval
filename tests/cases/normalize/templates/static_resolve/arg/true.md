# Preval test case

# true.md

> Normalize > Templates > Static resolve > Arg > True
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${true}`);
`````

## Pre Normal

`````js filename=intro
$(`` + String(true) + ``);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `true`;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + ``;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`true`);
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
