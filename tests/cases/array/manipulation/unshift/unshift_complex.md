# Preval test case

# unshift_complex.md

> Array > Manipulation > Unshift > Unshift complex
>
> Array literal with unshift and a const function binding in between
> The push should not push complex values (like implicit globals)

## Input

`````js filename=intro
const ARR = [ `a`, `b`, `c` ];
const NOOP = function() {
$(ARR);
};
const count = ARR.unshift($);
$(count);
ARR.push(count);
$(NOOP);
`````


## Settled


`````js filename=intro
const ARR /*:array*/ = [`a`, `b`, `c`];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$dotCall($array_unshift, ARR, `unshift`, $);
$(4);
$dotCall($array_push, ARR, `push`, 4);
$(NOOP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [`a`, `b`, `c`];
const NOOP = function () {
  $(ARR);
};
$dotCall($array_unshift, ARR, `unshift`, $);
$(4);
$dotCall($array_push, ARR, `push`, 4);
$(NOOP);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c" ];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$dotCall( $array_unshift, a, "unshift", $ );
$( 4 );
$dotCall( $array_push, a, "push", 4 );
$( b );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpCallCompVal
- (todo) access object property that also exists on prototype? $array_push


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
