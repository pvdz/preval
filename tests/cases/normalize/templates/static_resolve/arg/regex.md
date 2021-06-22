# Preval test case

# regex.md

> Normalize > Templates > Static resolve > Arg > Regex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${/foo/g}`);
`````

## Pre Normal

`````js filename=intro
$(`` + String(/foo/g) + ``);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpCallCallee$1 = String;
const tmpCalleeParam$1 = /foo/g;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + ``;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = /foo/g;
const tmpBinBothRhs = String(tmpCalleeParam$1);
$(tmpBinBothRhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '/foo/g'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
