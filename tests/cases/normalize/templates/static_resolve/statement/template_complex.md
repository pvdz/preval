# Preval test case

# template_complex.md

> Normalize > Templates > Static resolve > Statement > Template complex
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
`${`a ${$(1)} b`}`;
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
$coerce(tmpCalleeParam$1, `string`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(1), `string`);
`````

## Pre Normal


`````js filename=intro
`` + $coerce(`a ` + $coerce($(1), `string`) + ` b`, `string`) + ``;
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothLhs$1 = `a `;
const tmpCalleeParam$1 = $(1);
const tmpBinBothRhs$1 = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR} b`;
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
$coerce(tmpBinLhs, `plustr`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$coerce( a, "string" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
