# Preval test case

# call.md

> Normalize > Arguments > Call
>
> Normalizing call args when they are not identifier or literal

## Input

`````js filename=intro
$($());
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $();
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($());
`````

## Pre Normal


`````js filename=intro
$($());
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = $();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
