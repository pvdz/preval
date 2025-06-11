# Preval test case

# math_with_rest_params.md

> Math > Ai > Math with rest params
>
> Math.max with rest parameters

## Input

`````js filename=intro
function max(...args) { return Math.max(...args); }
const a = $(max(1, 5, 3));
$(a);
// Should be 5
`````


## Settled


`````js filename=intro
const max /*:(array)=>number*/ = function (...$$0 /*:array*/) {
  const args /*:array*/ /*truthy*/ = $$0;
  debugger;
  const tmpReturnArg /*:number*/ = $Math_max(...args);
  return tmpReturnArg;
};
const tmpCalleeParam /*:number*/ = max(1, 5, 3);
const a /*:unknown*/ = $(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const max = function (...$$0 /*:array*/) {
  const args = $$0;
  const tmpReturnArg = $Math_max(...args);
  return tmpReturnArg;
};
$($(max(1, 5, 3)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = $Math_max( ...b );
  return c;
};
const d = a( 1, 5, 3 );
const e = $( d );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let max = function (...$$0 /*:array*/) {
  let args = $$0;
  debugger;
  const tmpMCF = $Math_max;
  const tmpReturnArg = $Math_max(...args);
  return tmpReturnArg;
};
let tmpCalleeParam = max(1, 5, 3);
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_max


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
