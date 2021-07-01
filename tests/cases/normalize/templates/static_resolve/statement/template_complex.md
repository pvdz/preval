# Preval test case

# template_complex.md

> Normalize > Templates > Static resolve > Statement > Template complex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
`${`a ${$(1)} b`}`;
`````

## Pre Normal

`````js filename=intro
`` + String(`a ` + String($(1)) + ` b`) + ``;
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpCallCallee = String;
const tmpBinBothLhs$1 = `a `;
const tmpCallCallee$1 = String;
const tmpCalleeParam$1 = $(1);
const tmpBinBothRhs$1 = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = tmpBinLhs$1 + ``;
const tmpCalleeParam = `${tmpStringConcatR} b`;
const tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
tmpBinLhs + ``;
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
String(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
