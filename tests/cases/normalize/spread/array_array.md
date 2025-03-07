# Preval test case

# array_array.md

> Normalize > Spread > Array array
>
> Spreading an array literal can be resolved statically

## Input

`````js filename=intro
const x = [...[1, 2, 3, 4]];
$(x);
`````

## Settled


`````js filename=intro
const x /*:array*/ = [1, 2, 3, 4];
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3, 4]);
`````

## Pre Normal


`````js filename=intro
const x = [...[1, 2, 3, 4]];
$(x);
`````

## Normalized


`````js filename=intro
const x = [1, 2, 3, 4];
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, 4 ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 2, 3, 4]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
