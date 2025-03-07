# Preval test case

# charcodeat_noargs.md

> Type tracked > String constructor > Charcodeat noargs
>
> Should try to inline the charCodeAt call

## Input

`````js filename=intro
$(String.fromCharCode());
`````

## Settled


`````js filename=intro
$(``);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
`````

## Pre Normal


`````js filename=intro
$(String.fromCharCode());
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $String_fromCharCode();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
