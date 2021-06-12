# Preval test case

# simple_complex.md

> Normalize > Templates > Simple complex
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ 10 } ${ $(20) } def`);
`````

## Pre Normal

`````js filename=intro
$('abc ' + 10 + ' ' + $(20) + ' def');
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinLhs$1 = 'abc 10';
const tmpBinBothLhs = tmpBinLhs$1 + ' ';
const tmpBinBothRhs = $(20);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + ' def';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = $(20);
const tmpBinLhs = 'abc 10 ' + tmpBinBothRhs;
const tmpCalleeParam = tmpBinLhs + ' def';
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 20
 - 2: 'abc 10 20 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
