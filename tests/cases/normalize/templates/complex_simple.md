# Preval test case

# complex_simple.md

> Normalize > Templates > Complex simple
>
> A template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$(`abc ${ $(10) } ${ 20 } def`);
`````

## Pre Normal


`````js filename=intro
$(`abc ` + $coerce($(10), `string`) + ` ` + $coerce(20, `string`) + ` def`);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs$1 = `abc `;
const tmpCalleeParam$1 = $(10);
const tmpBinBothRhs$1 = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothLhs = `${tmpStringConcatR} `;
const tmpBinBothRhs = $coerce(20, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR$1 = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR$1} def`;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(10);
const tmpBinBothRhs$1 /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const tmpCalleeParam /*:string*/ = `abc ${tmpBinBothRhs$1} 20 def`;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
const b = $coerce( a, "string" );
const c = `abc ${b} 20 def`;
$( c );
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
