# Preval test case

# literal_and_call.md

> Normalize > Array > Literal and call
>
> Make sure empty array works

## Input

`````js filename=intro
$([100, $()]);
`````

## Settled


`````js filename=intro
const tmpArrElement$1 /*:unknown*/ = $();
const tmpCalleeParam /*:array*/ = [100, tmpArrElement$1];
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement$1 = $();
$([100, tmpArrElement$1]);
`````

## Pre Normal


`````js filename=intro
$([100, $()]);
`````

## Normalized


`````js filename=intro
const tmpArrElement = 100;
const tmpArrElement$1 = $();
const tmpCalleeParam = [tmpArrElement, tmpArrElement$1];
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = [ 100, a ];
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: [100, undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
