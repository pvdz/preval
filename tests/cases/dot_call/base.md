# Preval test case

# base.md

> Dot call > Base
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const arr = [1, 2];
const tmpCallVal = arr.push;
const x = $dotCall(tmpCallVal, arr, 'push', 3);
$(x);
`````

## Settled


`````js filename=intro
$(3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
`````

## Pre Normal


`````js filename=intro
const arr = [1, 2];
const tmpCallVal = arr.push;
const x = $dotCall(tmpCallVal, arr, `push`, 3);
$(x);
`````

## Normalized


`````js filename=intro
const arr = [1, 2];
const x = arr.push(3);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
