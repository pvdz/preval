# Preval test case

# concat_arrays_nested.md

> Builtins cases > Array > Concat arrays nested
>
> const a = [];

## Input

`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = b.concat(d);
const f = $coerce( e, "plustr" );
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

## Pre Normal


`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = b.concat(d);
const f = $coerce(e, `plustr`);
$(f);
`````

## Normalized


`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = b.concat(d);
const f = $coerce(e, `plustr`);
$(f);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "," );
`````

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

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_concat
