# Preval test case

# const-plus2.md

> Binary > Const-plus2
>
> Const inlining with addition inlining will require a loop of sorts

## Input

`````js filename=intro
`b${`a`}`;
const z = `a${`b${`a`}`}`;
z;
$(z);
`````

## Settled


`````js filename=intro
$(`aba`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`aba`);
`````

## Pre Normal


`````js filename=intro
`b` + $coerce(`a`, `string`) + ``;
const z = `a` + $coerce(`b` + $coerce(`a`, `string`) + ``, `string`) + ``;
null;
$(z);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = `b`;
const tmpBinBothRhs = $coerce(`a`, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
$coerce(tmpBinLhs, `plustr`);
const tmpBinBothLhs$1 = `a`;
const tmpBinBothLhs$3 = `b`;
const tmpBinBothRhs$3 = $coerce(`a`, `string`);
const tmpBinLhs$3 = tmpBinBothLhs$3 + tmpBinBothRhs$3;
const tmpCalleeParam = $coerce(tmpBinLhs$3, `plustr`);
const tmpBinBothRhs$1 = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const z = $coerce(tmpBinLhs$1, `plustr`);
$(z);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "aba" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'aba'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
