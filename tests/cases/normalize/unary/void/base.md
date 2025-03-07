# Preval test case

# base.md

> Normalize > Unary > Void > Base
>
> Void is really just undefined

## Input

`````js filename=intro
$(void 5);
`````

## Settled


`````js filename=intro
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````

## Pre Normal


`````js filename=intro
$(void 5);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = undefined;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
