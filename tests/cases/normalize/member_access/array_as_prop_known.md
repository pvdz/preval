# Preval test case

# array_as_prop_known.md

> Normalize > Member access > Array as prop known
>
>

## Input

`````js filename=intro
const arr = ['toString'];       // preval knows
const arr2 = Array.from(arr);
const xyz = String[arr]();
$(xyz);
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [`toString`];
$Array_from(arr);
$(`function String() { [native code] }`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$Array_from([`toString`]);
$(`function String() { [native code] }`);
`````

## Pre Normal


`````js filename=intro
const arr = [`toString`];
const arr2 = Array.from(arr);
const xyz = String[arr]();
$(xyz);
`````

## Normalized


`````js filename=intro
const arr = [`toString`];
const arr2 = $Array_from(arr);
const xyz = String[arr]();
$(xyz);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "toString" ];
$Array_from( a );
$( "function String() { [native code] }" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'function() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $Array_from
