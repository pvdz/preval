# Preval test case

# typeof_empty.md

> Array > Static context > Typeof empty
>
> Calling Boolean on arrays trigger spies

## Input

`````js filename=intro
$(typeof [0]);
`````

## Settled


`````js filename=intro
$(`object`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`object`);
`````

## Pre Normal


`````js filename=intro
$(typeof [0]);
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = [0];
const tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "object" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
