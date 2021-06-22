# Preval test case

# template_complex.md

> Normalize > Templates > Static resolve > Arg > Template complex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
$(`${`a ${$(1)} b`}`);
`````

## Pre Normal

`````js filename=intro
$(`` + String(`a ` + String($(1)) + ` b`) + ``);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpCallCallee$1 = String;
const tmpBinBothLhs$1 = `a `;
const tmpCallCallee$3 = String;
const tmpCalleeParam$3 = $(1);
const tmpBinBothRhs$1 = tmpCallCallee$3(tmpCalleeParam$3);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpCalleeParam$1 = tmpBinLhs$1 + ` b`;
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + ``;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam$3 = $(1);
const tmpBinBothRhs$1 = String(tmpCalleeParam$3);
const tmpCalleeParam$1 = `a ${tmpBinBothRhs$1} b`;
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'a 1 b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
