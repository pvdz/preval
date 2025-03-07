# Preval test case

# spread_member_call2.md

> Normalize > Array > Spread member call2
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
$([...'true']);
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
$([...`true`]);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [`t`, `r`, `u`, `e`];
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
