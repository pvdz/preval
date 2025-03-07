# Preval test case

# percent.md

> Normalize > Binary > Percent
>
> Baseline binary expressions to cover ops

## Input

`````js filename=intro
$(5 % 3);
`````

## Settled


`````js filename=intro
$(2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````

## Pre Normal


`````js filename=intro
$(5 % 3);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = 2;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
