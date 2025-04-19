# Preval test case

# pop_empty.md

> Array > Manipulation > Pop > Pop empty
>
> Remove element from array

## Input

`````js filename=intro
const ARR = [];
const NOOP = function() {
$(ARR);
};
const n = ARR.shift();
$(n);
ARR.push(n);
$(NOOP);
$(ARR);
`````


## Settled


`````js filename=intro
const ARR /*:array*/ = [];
const NOOP /*:()=>unknown*/ = function () {
  debugger;
  $(ARR);
  return undefined;
};
$(undefined);
$dotCall($array_push, ARR, `push`, undefined);
$(NOOP);
$(ARR);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const ARR = [];
const NOOP = function () {
  $(ARR);
};
$(undefined);
$dotCall($array_push, ARR, `push`, undefined);
$(NOOP);
$(ARR);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = function() {
  debugger;
  $( a );
  return undefined;
};
$( undefined );
$dotCall( $array_push, a, "push", undefined );
$( b );
$( a );
`````


## Todos triggered


- (todo) arr mutation may be able to inline this method: tmpCallCompVal
- (todo) outline any args for tdz
- (todo) access object property that also exists on prototype? $array_push


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: '<function>'
 - 3: [undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
