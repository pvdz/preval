# Preval test case

# arr_numbers.md

> Array > Arr numbers
>
> Serializing an array with elided positions

## Input

`````js filename=intro
const tmpBinBothRhs = [1, , 3];
const tmpBinLhs = '' + tmpBinBothRhs;
$(tmpBinLhs);
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
const tmpBinBothRhs = [1, , 3];
const tmpBinLhs = `` + tmpBinBothRhs;
$(tmpBinLhs);
`````

## Normalized


`````js filename=intro
const tmpBinBothRhs = [1, , 3];
const tmpBinLhs = $coerce(tmpBinBothRhs, `plustr`);
$(tmpBinLhs);
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
