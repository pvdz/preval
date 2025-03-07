# Preval test case

# arr_holes.md

> Normalize > Templates > Static resolve > Arg > Arr holes
>
> Templates should be able to resolve literals

## Input

`````js filename=intro
$(`${[1,,3]}`);
`````

## Settled


`````js filename=intro
$(`1,,3`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`1,,3`);
`````

## Pre Normal


`````js filename=intro
$(`` + $coerce([1, , 3], `string`) + ``);
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = ``;
const tmpCalleeParam$1 = [1, , 3];
const tmpBinBothRhs = $coerce(tmpCalleeParam$1, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "1,,3" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '1,,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
