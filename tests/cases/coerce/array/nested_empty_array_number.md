# Preval test case

# nested_empty_array_number.md

> Coerce > Array > Nested empty array number

## Input

`````js filename=intro
const a = [];
const b = [a];
const c = $coerce(b, 'number');
$(c);
`````

## Settled


`````js filename=intro
$(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````

## Pre Normal


`````js filename=intro
const a = [];
const b = [a];
const c = $coerce(b, `number`);
$(c);
`````

## Normalized


`````js filename=intro
const a = [];
const b = [a];
const c = $coerce(b, `number`);
$(c);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
