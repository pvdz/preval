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
const tmpMCF$1 /*:unknown*/ = String[arr];
const xyz /*:unknown*/ = $dotCall(tmpMCF$1, String, undefined);
$(xyz);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [`toString`];
$Array_from(arr);
$(String[arr]());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "toString" ];
$Array_from( a );
const b = String[ a ];
const c = $dotCall( b, String, undefined );
$( c );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Array_from


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
