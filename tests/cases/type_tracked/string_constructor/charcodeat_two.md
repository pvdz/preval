# Preval test case

# charcodeat_two.md

> Type tracked > String constructor > Charcodeat two
>
> Should try to inline the charCodeAt call

## Input

`````js filename=intro
$(String.fromCharCode(80, 70));
`````

## Settled


`````js filename=intro
$(`PF`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`PF`);
`````

## Pre Normal


`````js filename=intro
$(String.fromCharCode(80, 70));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $String_fromCharCode(80, 70);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "PF" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'PF'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
