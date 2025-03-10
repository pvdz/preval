# Preval test case

# array_as_prop_unknown.md

> Normalize > Member access > Array as prop unknown
>
>

## Input

`````js filename=intro
const arr = $(['toString']);
const arr2 = Array.from(arr);
const xyz = String[arr]();
$(xyz);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`toString`];
const arr /*:unknown*/ = $(tmpCalleeParam);
$Array_from(arr);
const xyz /*:unknown*/ = String[arr]();
$(xyz);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([`toString`]);
$Array_from(arr);
$(String[arr]());
`````

## Pre Normal


`````js filename=intro
const arr = $([`toString`]);
const arr2 = Array.from(arr);
const xyz = String[arr]();
$(xyz);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [`toString`];
const arr = $(tmpCalleeParam);
const arr2 = $Array_from(arr);
const xyz = String[arr]();
$(xyz);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "toString" ];
const b = $( a );
$Array_from( b );
const c = String[ b ]();
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['toString']
 - 2: 'function() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Array_from
