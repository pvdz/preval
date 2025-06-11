# Preval test case

# math_with_sparse_array_map.md

> Math > Ai > Math with sparse array map
>
> Math.sqrt with sparse array and map

## Input

`````js filename=intro
const arr = [4, , 16];
const result = arr.map(Math.sqrt);
$(result[0]);
$(result[1]);
$(result[2]);
// Should be 2, undefined, 4
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [4, , 16];
const result /*:array*/ /*truthy*/ = $dotCall($array_map, arr, `map`, $Math_sqrt);
const tmpCalleeParam /*:unknown*/ = result[0];
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = result[1];
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = result[2];
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const result = $dotCall($array_map, [4, , 16], `map`, $Math_sqrt);
$(result[0]);
$(result[1]);
$(result[2]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 4, ,, 16 ];
const b = $dotCall( $array_map, a, "map", $Math_sqrt );
const c = b[ 0 ];
$( c );
const d = b[ 1 ];
$( d );
const e = b[ 2 ];
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [4, , 16];
const tmpMCF = arr.map;
const tmpMCP = $Math_sqrt;
const result = $dotCall(tmpMCF, arr, `map`, $Math_sqrt);
let tmpCalleeParam = result[0];
$(tmpCalleeParam);
let tmpCalleeParam$1 = result[1];
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = result[2];
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: $array_map
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: undefined
 - 3: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
