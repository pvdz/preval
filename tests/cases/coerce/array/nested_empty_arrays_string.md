# Preval test case

# nested_empty_arrays_string.md

> Coerce > Array > Nested empty arrays string

## Input

`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = [b, d];
const f = $coerce(e, 'string');
$(f);
`````


## Settled


`````js filename=intro
$(`,`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`,`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "," );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = [b, d];
const f = $coerce(e, `string`);
$(f);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ','
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
