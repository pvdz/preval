# Preval test case

# rest_typing.md

> Function inlining > Rest typing
>
> When inferring the type of rest to "array", make sure the param and the function get this both.

## Input

`````js filename=intro
function f(...arr) {
  $(arr);
}
f(1,2,3);
`````


## Settled


`````js filename=intro
const f /*:(array)=>undefined*/ = function (...$$0 /*:array*/) {
  const arr /*:array*/ = $$0;
  debugger;
  $(arr);
  return undefined;
};
f(1, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (...$$0 /*:array*/) {
  $($$0);
};
f(1, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( b );
  return undefined;
};
a( 1, 2, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let arr = $$0;
  debugger;
  $(arr);
  return undefined;
};
f(1, 2, 3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
