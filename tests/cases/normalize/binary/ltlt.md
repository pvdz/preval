# Preval test case

# ltlt.md

> Normalize > Binary > Ltlt
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 << 3);
`````

## Settled


`````js filename=intro
$(40);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(40);
`````

## Pre Normal


`````js filename=intro
$(5 << 3);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = 40;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 40 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 40
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
