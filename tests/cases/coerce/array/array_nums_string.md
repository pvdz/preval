# Preval test case

# array_nums_string.md

> Coerce > Array > Array nums string

## Input

`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, 'string');
$(b);
`````

## Settled


`````js filename=intro
$(`1,2,3`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`1,2,3`);
`````

## Pre Normal


`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, `string`);
$(b);
`````

## Normalized


`````js filename=intro
const a = [1, 2, 3];
const b = $coerce(a, `string`);
$(b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "1,2,3" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '1,2,3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
