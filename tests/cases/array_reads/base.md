# Preval test case

# base.md

> Array reads > Base
>
> Inlining array properties

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(arr[0]);
`````

## Settled


`````js filename=intro
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2, 3];
$(arr[0]);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
const tmpCalleeParam = arr[0];
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
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

Todos triggered:
- inline computed array property read
