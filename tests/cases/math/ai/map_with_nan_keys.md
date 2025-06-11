# Preval test case

# map_with_nan_keys.md

> Math > Ai > Map with nan keys
>
> Map treats all NaN as the same key

## Input

`````js filename=intro
const m = new Map();
m.set(NaN, "a");
m.set(0/0, "b");
$(m.size);
$(m.get(NaN));
// Should be 1, "b"
`````


## Settled


`````js filename=intro
const m /*:map*/ /*truthy*/ = new $map_constructor();
$dotCall($map_set, m, `set`, $Number_NaN, `a`);
$dotCall($map_set, m, `set`, $Number_NaN, `b`);
const tmpCalleeParam /*:number*/ = m.size;
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ /*truthy*/ = $dotCall($map_get, m, `get`, $Number_NaN);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const m = new $map_constructor();
$dotCall($map_set, m, `set`, $Number_NaN, `a`);
$dotCall($map_set, m, `set`, $Number_NaN, `b`);
$(m.size);
$($dotCall($map_get, m, `get`, $Number_NaN));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $map_constructor();
$dotCall( $map_set, a, "set", $Number_NaN, "a" );
$dotCall( $map_set, a, "set", $Number_NaN, "b" );
const b = a.size;
$( b );
const c = $dotCall( $map_get, a, "get", $Number_NaN );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const m = new $map_constructor();
const tmpMCF = m.set;
$dotCall(tmpMCF, m, `set`, $Number_NaN, `a`);
const tmpMCF$1 = m.set;
const tmpMCP = NaN;
$dotCall(tmpMCF$1, m, `set`, $Number_NaN, `b`);
let tmpCalleeParam = m.size;
$(tmpCalleeParam);
const tmpMCF$3 = m.get;
let tmpCalleeParam$1 = $dotCall(tmpMCF$3, m, `get`, $Number_NaN);
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $map_get
- (todo) access object property that also exists on prototype? $map_set
- (todo) type trackeed tricks can possibly support static $map_get
- (todo) type trackeed tricks can possibly support static $map_set


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
