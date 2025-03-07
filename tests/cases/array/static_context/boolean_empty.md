# Preval test case

# boolean_empty.md

> Array > Static context > Boolean empty
>
> Calling Boolean on arrays trigger spies

## Input

`````js filename=intro
$(Boolean([]));
`````

## Settled


`````js filename=intro
$(true);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````

## Pre Normal


`````js filename=intro
$(Boolean([]));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$1 = [];
const tmpCalleeParam = Boolean(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
