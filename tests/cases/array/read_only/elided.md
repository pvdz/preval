# Preval test case

# elided.md

> Array > Read only > Elided
>
> Arrays where it only reads properties

## Input

`````js filename=intro
const arr = [1, , 3, 4];
$(arr[1]);
$(arr[3]);
$(`${arr[2]}xyz`);
`````

## Settled


`````js filename=intro
$(undefined);
$(4);
$(`3xyz`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(4);
$(`3xyz`);
`````

## Pre Normal


`````js filename=intro
const arr = [1, , 3, 4];
$(arr[1]);
$(arr[3]);
$(`` + $coerce(arr[2], `string`) + `xyz`);
`````

## Normalized


`````js filename=intro
const arr = [1, , 3, 4];
const tmpCalleeParam = arr[1];
$(tmpCalleeParam);
const tmpCalleeParam$1 = arr[3];
$(tmpCalleeParam$1);
const tmpBinBothLhs = ``;
const tmpCalleeParam$5 = arr[2];
const tmpBinBothRhs = $coerce(tmpCalleeParam$5, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam$3 = `${tmpStringConcatR}xyz`;
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 4 );
$( "3xyz" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: 4
 - 3: '3xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
