# Preval test case

# empty_array_string.md

> Coerce > Array > Empty array string

## Input

`````js filename=intro
const a = [];
const b = $coerce(a, 'string');
$(b);
`````

## Settled


`````js filename=intro
$(``);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
`````

## Pre Normal


`````js filename=intro
const a = [];
const b = $coerce(a, `string`);
$(b);
`````

## Normalized


`````js filename=intro
const a = [];
const b = $coerce(a, `string`);
$(b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
