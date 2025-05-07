# Preval test case

# unused_spread_param_multi-call.md

> Rest > Param > Unused > Unused spread param multi-call
>
> A function with a spread param that we know will not receive any args should be an empty array

## Input

`````js filename=intro
function f(...rest) {
  $(rest);
}
f();
f();
f();
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  const rest /*:array*/ = [];
  $(rest);
  return undefined;
};
f();
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $([]);
};
f();
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [];
  $( b );
  return undefined;
};
a();
a();
a();
`````


## Todos triggered


- (todo) drop unused rest param?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: []
 - 3: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
