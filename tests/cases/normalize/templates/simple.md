# Preval test case

# simple.md

> Normalize > Templates > Simple
>
> A template that has complex elements should be normalized to only contain simple ones

#TODO

## Input

`````js filename=intro
$(`abc ${ $(1) } def`);
`````

## Pre Normal


`````js filename=intro
$(`abc ` + $coerce($(1), `string`) + ` def`);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = `abc `;
const tmpCallCallee$1 = $(1);
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR} def`;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCallCallee$1 = $(1);
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpCalleeParam = `abc ${tmpBinBothRhs} def`;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $coerce( a, "string" );
const c = `abc ${tmpBinBothRhs} def`;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'abc 1 def'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
