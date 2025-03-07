# Preval test case

# arr_holes.md

> Normalize > Templates > Static resolve > Statement > Arr holes
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
`${[1,,3]}`;
`````

## Settled


`````js filename=intro

`````

## Denormalized
(This ought to be the final result)

`````js filename=intro

`````

## Pre Normal


`````js filename=intro
`` + $coerce([1, , 3], `string`) + ``;
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpCalleeParam = [1, , 3];
const tmpBinBothRhs = $coerce(tmpCalleeParam, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
$coerce(tmpBinLhs, `plustr`);
`````

## PST Settled
With rename=true

`````js filename=intro

`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
