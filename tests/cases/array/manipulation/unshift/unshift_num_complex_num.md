# Preval test case

# unshift_num_complex_num.md

> Array > Manipulation > Unshift > Unshift num complex num
>
> Array literal with unshift and a const function binding in between
> The push should inline the first but not the second because it is complex

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const count = ARR.unshift(10, $, 20);
$(count);
ARR.push(count);
$(NOOP);
`````


## Settled


`````js filename=intro
const ARR /*:array*/ = [20, `a`, `b`, `c`];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$dotCall($array_unshift, ARR, `unshift`, 10, $);
$(6);
$dotCall($array_push, ARR, `push`, 6);
$(NOOP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [20, `a`, `b`, `c`];
const NOOP = function () {
  $(ARR);
};
$dotCall($array_unshift, ARR, `unshift`, 10, $);
$(6);
$dotCall($array_push, ARR, `push`, 6);
$(NOOP);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 20, "a", "b", "c" ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$dotCall( $array_unshift, a, "unshift", 10, $ );
$( 6 );
$dotCall( $array_push, a, "push", 6 );
$( b );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) access object property that also exists on prototype? $array_push
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 6
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
