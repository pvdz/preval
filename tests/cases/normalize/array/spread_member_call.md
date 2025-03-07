# Preval test case

# spread_member_call.md

> Normalize > Array > Spread member call
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
$([...true.toString()]);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`t`, `r`, `u`, `e`];
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`t`, `r`, `u`, `e`]);
`````

## Pre Normal


`````js filename=intro
$([...true.toString()]);
`````

## Normalized


`````js filename=intro
const tmpArrSpread = true.toString();
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "t", "r", "u", "e" ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['t', 'r', 'u', 'e']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
