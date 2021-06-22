# Preval test case

# complex_simple.md

> Normalize > Templates > Complex simple
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ $(10) } ${ 20 } def`);
`````

## Pre Normal

`````js filename=intro
$(`abc ` + String($(10)) + ` ` + String(20) + ` def`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs$1 = `abc `;
const tmpCallCallee$1 = String;
const tmpCalleeParam$1 = $(10);
const tmpBinBothRhs$1 = tmpCallCallee$1(tmpCalleeParam$1);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs = tmpBinLhs$1 + ` `;
const tmpBinBothRhs = `20`;
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + ` def`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(10);
const tmpBinBothRhs$1 = String(tmpCalleeParam$1);
const tmpCalleeParam = `abc ${tmpBinBothRhs$1} 20 def`;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 'abc 10 20 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
