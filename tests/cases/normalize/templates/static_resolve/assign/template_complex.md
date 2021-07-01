# Preval test case

# template_complex.md

> Normalize > Templates > Static resolve > Assign > Template complex
>
> Templates should be able to resolve literals

#TODO

## Input

`````js filename=intro
let x = undefined;
x = `${`a ${$(1)} b`}`;
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
x = `` + String(`a ` + String($(1)) + ` b`) + ``;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
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
x = tmpBinLhs + ``;
$(x);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
const tmpBinBothRhs$1 = String(tmpCalleeParam$1);
const tmpCalleeParam = `a ${tmpBinBothRhs$1} b`;
$(tmpCalleeParam);
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
