# Preval test case

# math_with_set_map.md

> Math > Ai > Math with set map
>
> Math.sqrt on Set and Map values

## Input

`````js filename=intro
const s = new Set([4, 9, 16]);
const m = new Map([[1, 25], [2, 36]]);
const arr1 = Array.from(s).map(Math.sqrt);
const arr2 = Array.from(m.values()).map(Math.sqrt);
$(arr1[0]);
$(arr1[1]);
$(arr1[2]);
$(arr2[0]);
$(arr2[1]);
// Should be 2, 3, 4, 5, 6
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [4, 9, 16];
const s /*:set*/ /*truthy*/ = new $set_constructor(tmpCalleeParam);
const tmpArrElement /*:array*/ /*truthy*/ = [1, 25];
const tmpArrElement$1 /*:array*/ /*truthy*/ = [2, 36];
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [tmpArrElement, tmpArrElement$1];
const m /*:map*/ /*truthy*/ = new $map_constructor(tmpCalleeParam$1);
const tmpMCOO /*:array*/ /*truthy*/ = $Array_from(s);
const arr1 /*:array*/ /*truthy*/ = $dotCall($array_map, tmpMCOO, `map`, $Math_sqrt);
const tmpMCP$1 /*:iterator*/ /*truthy*/ = $dotCall($map_values, m, `values`);
const tmpMCOO$1 /*:array*/ /*truthy*/ = $Array_from(tmpMCP$1);
const arr2 /*:array*/ /*truthy*/ = $dotCall($array_map, tmpMCOO$1, `map`, $Math_sqrt);
const tmpCalleeParam$3 /*:unknown*/ = arr1[0];
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:unknown*/ = arr1[1];
$(tmpCalleeParam$5);
const tmpCalleeParam$7 /*:unknown*/ = arr1[2];
$(tmpCalleeParam$7);
const tmpCalleeParam$9 /*:unknown*/ = arr2[0];
$(tmpCalleeParam$9);
const tmpCalleeParam$11 /*:unknown*/ = arr2[1];
$(tmpCalleeParam$11);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = [4, 9, 16];
const s = new $set_constructor(tmpCalleeParam);
const tmpArrElement = [1, 25];
const tmpArrElement$1 = [2, 36];
const tmpCalleeParam$1 = [tmpArrElement, tmpArrElement$1];
const m = new $map_constructor(tmpCalleeParam$1);
const arr1 = $dotCall($array_map, $Array_from(s), `map`, $Math_sqrt);
const arr2 = $dotCall($array_map, $Array_from($dotCall($map_values, m, `values`)), `map`, $Math_sqrt);
$(arr1[0]);
$(arr1[1]);
$(arr1[2]);
$(arr2[0]);
$(arr2[1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 4, 9, 16 ];
const b = new $set_constructor( a );
const c = [ 1, 25 ];
const d = [ 2, 36 ];
const e = [ c, d ];
const f = new $map_constructor( e );
const g = $Array_from( b );
const h = $dotCall( $array_map, g, "map", $Math_sqrt );
const i = $dotCall( $map_values, f, "values" );
const j = $Array_from( i );
const k = $dotCall( $array_map, j, "map", $Math_sqrt );
const l = h[ 0 ];
$( l );
const m = h[ 1 ];
$( m );
const n = h[ 2 ];
$( n );
const o = k[ 0 ];
$( o );
const p = k[ 1 ];
$( p );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpNewCallee = Set;
let tmpCalleeParam = [4, 9, 16];
const s = new tmpNewCallee(tmpCalleeParam);
const tmpNewCallee$1 = Map;
const tmpArrElement = [1, 25];
const tmpArrElement$1 = [2, 36];
let tmpCalleeParam$1 = [tmpArrElement, tmpArrElement$1];
const m = new tmpNewCallee$1(tmpCalleeParam$1);
const tmpMCF = $Array_from;
const tmpMCOO = $Array_from(s);
const tmpMCF$1 = tmpMCOO.map;
const tmpMCP = $Math_sqrt;
const arr1 = $dotCall(tmpMCF$1, tmpMCOO, `map`, $Math_sqrt);
const tmpMCF$3 = $Array_from;
const tmpMCF$5 = m.values;
const tmpMCP$1 = $dotCall(tmpMCF$5, m, `values`);
const tmpMCOO$1 = $dotCall(tmpMCF$3, $array_constructor, `from`, tmpMCP$1);
const tmpMCF$7 = tmpMCOO$1.map;
const tmpMCP$3 = $Math_sqrt;
const arr2 = $dotCall(tmpMCF$7, tmpMCOO$1, `map`, $Math_sqrt);
let tmpCalleeParam$3 = arr1[0];
$(tmpCalleeParam$3);
let tmpCalleeParam$5 = arr1[1];
$(tmpCalleeParam$5);
let tmpCalleeParam$7 = arr1[2];
$(tmpCalleeParam$7);
let tmpCalleeParam$9 = arr2[0];
$(tmpCalleeParam$9);
let tmpCalleeParam$11 = arr2[1];
$(tmpCalleeParam$11);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_map
- (todo) access object property that also exists on prototype? $map_values
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Array_from
- (todo) type trackeed tricks can possibly support static $array_map
- (todo) type trackeed tricks can possibly support static $map_values


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 4
 - 4: 5
 - 5: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
