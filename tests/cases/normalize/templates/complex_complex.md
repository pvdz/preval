# Preval test case

# complex_complex.md

> Normalize > Templates > Complex complex
>
> A template that has complex elements should be normalized to only contain simple ones

## Input

`````js filename=intro
$(`abc ${ $(10) } ${ $(20) } def`);
`````

## Pre Normal


`````js filename=intro
$(`abc ` + $coerce($(10), `string`) + ` ` + $coerce($(20), `string`) + ` def`);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs$1 = `abc `;
const tmpCalleeParam$1 = $(10);
const tmpBinBothRhs$1 = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothLhs = `${tmpStringConcatR} `;
const tmpCalleeParam$3 = $(20);
const tmpBinBothRhs = $coerce(tmpCalleeParam$3, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR$1 = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR$1} def`;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(10);
const tmpBinBothRhs$1 /*:string*/ = $coerce(tmpCalleeParam$1, `string`);
const tmpCalleeParam$3 /*:unknown*/ = $(20);
const tmpBinBothRhs /*:string*/ = $coerce(tmpCalleeParam$3, `string`);
const tmpCalleeParam /*:string*/ = `abc ${tmpBinBothRhs$1} ${tmpBinBothRhs} def`;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
const b = $coerce( a, "string" );
const c = $( 20 );
const d = $coerce( c, "string" );
const e = `abc ${b} ${d} def`;
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 'abc 10 20 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
