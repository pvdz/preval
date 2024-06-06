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
x = `` + $coerce(`a ` + $coerce($(1), `string`) + ` b`, `string`) + ``;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpBinBothLhs = ``;
const tmpBinBothLhs$1 = `a `;
const tmpCallCallee$1 = $(1);
const tmpBinBothRhs$1 = $coerce(tmpCallCallee$1, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const tmpCallCallee = `${tmpStringConcatR} b`;
const tmpBinBothRhs = $coerce(tmpCallCallee, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
x = $coerce(tmpBinLhs, `plustr`);
$(x);
`````

## Output


`````js filename=intro
const tmpCallCallee$1 = $(1);
const tmpBinBothRhs$1 = $coerce(tmpCallCallee$1, `string`);
const tmpCallCallee = `a ${tmpBinBothRhs$1} b`;
$(tmpCallCallee);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $coerce( a, "string" );
const c = `a ${[object Object]} b`;
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
