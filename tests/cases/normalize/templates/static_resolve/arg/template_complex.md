# Preval test case

# template_complex.md

> Normalize > Templates > Static resolve > Arg > Template complex
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${`a ${$(1)} b`}`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce(`a ` + $coerce($(1), `string`) + ` b`, `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinBothLhs = ``;
const tmpBinBothLhs$1 = `a `;
const tmpCallCallee$3 = $(1);
const tmpBinBothRhs$1 = $coerce(tmpCallCallee$3, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const tmpCallCallee$1 = `${tmpStringConcatR} b`;
const tmpBinBothRhs = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCallCallee$3 /*:unknown*/ = $(1);
const tmpBinBothRhs$1 /*:string*/ = $coerce(tmpCallCallee$3, `string`);
const tmpCallCallee$1 /*:string*/ = `a ${tmpBinBothRhs$1} b`;
$(tmpCallCallee$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $coerce( a, "string" );
const c = `a ${b} b`;
$( c );
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
