# Preval test case

# complex.md

> Normalize > Templates > Complex
>
> A template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$(`abc ${ 10 } def`);
`````

## Pre Normal


`````js filename=intro
$(`abc ` + $coerce(10, `string`) + ` def`);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = `abc `;
const tmpBinBothRhs = $coerce(10, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR} def`;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`abc 10 def`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "abc 10 def" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'abc 10 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
