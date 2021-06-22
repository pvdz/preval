# Preval test case

# null.md

> Normalize > Templates > Static resolve > Arg > Null
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${null}`);
`````

## Pre Normal

`````js filename=intro
$(`` + String(null) + ``);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpBinBothRhs = `null`;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + ``;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`null`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'null'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
