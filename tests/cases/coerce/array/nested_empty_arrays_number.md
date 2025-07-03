# Preval test case

# nested_empty_arrays_number.md

> Coerce > Array > Nested empty arrays number

## Input

`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = [b, d];
const f = $coerce(e, 'number');
$(f);
`````


## Settled


`````js filename=intro
$($Number_NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_NaN );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = [b, d];
const f = $coerce(e, `number`);
$(f);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


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
