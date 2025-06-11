# Preval test case

# math_in_callback.md

> Math > Ai > Math in callback
>
> Math in callback function

## Input

`````js filename=intro
const arr = [1, 2, 3];
const squares = arr.map(x => Math.pow(x, 2));
$(squares[0]);
$(squares[1]);
$(squares[2]);
// Should be 1, 4, 9
`````


## Settled


`````js filename=intro
const tmpMCP /*:(unknown)=>number*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpReturnArg /*:number*/ = $Math_pow(x, 2);
  return tmpReturnArg;
};
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
const squares /*:array*/ /*truthy*/ = $dotCall($array_map, arr, `map`, tmpMCP);
const tmpCalleeParam /*:unknown*/ = squares[0];
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = squares[1];
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = squares[2];
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = function (x) {
  const tmpReturnArg = $Math_pow(x, 2);
  return tmpReturnArg;
};
const squares = $dotCall($array_map, [1, 2, 3], `map`, tmpMCP);
$(squares[0]);
$(squares[1]);
$(squares[2]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = $Math_pow( b, 2 );
  return c;
};
const d = [ 1, 2, 3 ];
const e = $dotCall( $array_map, d, "map", a );
const f = e[ 0 ];
$( f );
const g = e[ 1 ];
$( g );
const h = e[ 2 ];
$( h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const tmpMCF = arr.map;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpMCF$1 = $Math_pow;
  const tmpReturnArg = $Math_pow(x, 2);
  return tmpReturnArg;
};
const squares = $dotCall(tmpMCF, arr, `map`, tmpMCP);
let tmpCalleeParam = squares[0];
$(tmpCalleeParam);
let tmpCalleeParam$1 = squares[1];
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = squares[2];
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: $array_map
- (todo) support array reads statement type VarStatement
- (todo) type trackeed tricks can possibly support static $Math_pow
- (todo) type trackeed tricks can possibly support static $array_map


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 4
 - 3: 9
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
