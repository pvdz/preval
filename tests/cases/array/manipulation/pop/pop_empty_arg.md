# Preval test case

# pop_empty_arg.md

> Array > Manipulation > Pop > Pop empty arg
>
> Remove element from array

## Input

`````js filename=intro
const ARR = [];
const NOOP = function() {
$(ARR);
};
const n = ARR.pop($);
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


- (todo) access object property that also exists on prototype? $array_push
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) outline any args for tdz
- (todo) support array reads statement type VarStatement


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
