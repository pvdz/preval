# Preval test case

# array_nums_number.md

> Coerce > Array > Array nums number

## Input

`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, 'number');
$(b);
`````

## Settled


`````js filename=intro
$(NaN);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(NaN);
`````

## Pre Normal


`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, `number`);
$(b);
`````

## Normalized


`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, `number`);
$(b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( NaN );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
