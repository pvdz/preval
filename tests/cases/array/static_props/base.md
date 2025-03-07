# Preval test case

# base.md

> Array > Static props > Base
>
> Getting the length of an array can be tricky, and sometimes be done

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(arr.length);
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
const arr = [1, 2, 3];
$(arr.length);
`````

## Normalized


`````js filename=intro
const arr = [1, 2, 3];
const tmpCalleeParam = arr.length;
$(tmpCalleeParam);
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
