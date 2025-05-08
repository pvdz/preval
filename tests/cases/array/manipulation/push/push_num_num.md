# Preval test case

# push_num_num.md

> Array > Manipulation > Push > Push num num
>
> Array literal with push and a const function binding in between
> The push should inline the args and eliminate the call

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const count = ARR.push(10, 20);
$(count);
ARR.push(count);
$(NOOP);
`````


## Settled


`````js filename=intro
const ARR /*:array*/ = [`a`, `b`, `c`, 10, 20];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(5);
$dotCall($array_push, ARR, `push`, 5);
$(NOOP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [`a`, `b`, `c`, 10, 20];
const NOOP = function () {
  $(ARR);
};
$(5);
$dotCall($array_push, ARR, `push`, 5);
$(NOOP);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c", 10, 20 ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( 5 );
$dotCall( $array_push, a, "push", 5 );
$( b );
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
