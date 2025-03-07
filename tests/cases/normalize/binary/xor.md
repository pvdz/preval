# Preval test case

# xor.md

> Normalize > Binary > Xor
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 ^ 3);
`````

## Settled


`````js filename=intro
$(6);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(6);
`````

## Pre Normal


`````js filename=intro
$(5 ^ 3);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = 6;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 6 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
