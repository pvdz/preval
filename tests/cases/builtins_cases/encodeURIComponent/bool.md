# Preval test case

# bool.md

> Builtins cases > EncodeURIComponent > Bool
>
>

## Input

`````js filename=intro
$(encodeURIComponent(true));
`````

## Settled


`````js filename=intro
$(`true`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`true`);
`````

## Pre Normal


`````js filename=intro
$(encodeURIComponent(true));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = encodeURIComponent(true);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "true" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'true'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
