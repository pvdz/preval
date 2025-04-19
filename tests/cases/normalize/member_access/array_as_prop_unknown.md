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
const tmpCallCompVal$1 /*:unknown*/ = String[arr];
const xyz /*:unknown*/ = $dotCall(tmpCallCompVal$1, String, undefined);
$(xyz);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([`toString`]);
$Array_from(arr);
$(String[arr]());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "toString" ];
const b = $( a );
$Array_from( b );
const c = String[ b ];
const d = $dotCall( c, String, undefined );
$( d );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Array_from


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
