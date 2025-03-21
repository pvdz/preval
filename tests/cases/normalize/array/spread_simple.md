# Preval test case

# spread_simple.md

> Normalize > Array > Spread simple
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
const x = "foo";
$([...x]);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`f`, `o`, `o`];
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`f`, `o`, `o`]);
`````

## Pre Normal


`````js filename=intro
const x = `foo`;
$([...x]);
`````

## Normalized


`````js filename=intro
const x = `foo`;
const tmpCalleeParam = [...x];
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "f", "o", "o" ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['f', 'o', 'o']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
