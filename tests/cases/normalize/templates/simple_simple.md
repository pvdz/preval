# Preval test case

# simple_simple.md

> Normalize > Templates > Simple simple
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ 10 } ${ 20 } def`);
`````

## Pre Normal


`````js filename=intro
$(`abc ` + $coerce(10, `string`) + ` ` + $coerce(20, `string`) + ` def`);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs$1 = `abc `;
const tmpBinBothRhs$1 = $coerce(10, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothLhs = `${tmpStringConcatR} `;
const tmpBinBothRhs = $coerce(20, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR$1 = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR$1} def`;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`abc 10 20 def`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "abc 10 20 def" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'abc 10 20 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
