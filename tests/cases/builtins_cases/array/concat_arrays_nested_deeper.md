# Preval test case

# concat_arrays_nested_deeper.md

> Builtins cases > Array > Concat arrays nested deeper
>
> const a = [];

## Input

`````js filename=intro
const a1 = [];
const a2 = [a1];
const a3 = [a2];
const b1 = [];
const b2 = [b1];
const b3 = [b2];
const c = a3.concat(b3);
$(c);
`````

## Settled


`````js filename=intro
const a1 /*:array*/ = [];
const b1 /*:array*/ = [];
const a2 /*:array*/ = [a1];
const b2 /*:array*/ = [b1];
const c /*:array*/ = [a2, b2];
$(c);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a1 = [];
const b1 = [];
const a2 = [a1];
const b2 = [b1];
$([a2, b2]);
`````

## Pre Normal


`````js filename=intro
const a1 = [];
const a2 = [a1];
const a3 = [a2];
const b1 = [];
const b2 = [b1];
const b3 = [b2];
const c = a3.concat(b3);
$(c);
`````

## Normalized


`````js filename=intro
const a1 = [];
const a2 = [a1];
const a3 = [a2];
const b1 = [];
const b2 = [b1];
const b3 = [b2];
const c = a3.concat(b3);
$(c);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = [];
const c = [ a ];
const d = [ b ];
const e = [ c, d ];
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [[[]], [[]]]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_concat
