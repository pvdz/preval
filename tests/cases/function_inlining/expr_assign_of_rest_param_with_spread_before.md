# Preval test case

# expr_assign_of_rest_param_with_spread_before.md

> Function inlining > Expr assign of rest param with spread before
>
> A function that does a simple thing may need to be inlined in trivial cases.

The assignment in g uses a rest param. There are some cases where we can still transform this.

In this case, the function is called with a spread before the rest index so we can't do anything.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, ...b) {
    x = b;
  }
  const arr = $([1, 2])
  g(...arr, 10, 20, 30, 40, 50, 60);
}
f();
$(x);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 0;
const g /*:(unused, array)=>undefined*/ = function ($$0, ...$$1 /*:array*/) {
  const b /*:array*/ = $$1;
  debugger;
  x = b;
  return undefined;
};
const tmpCalleeParam /*:array*/ = [1, 2];
const arr /*:unknown*/ = $(tmpCalleeParam);
g(...arr, 10, 20, 30, 40, 50, 60);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
const g = function ($$0, ...$$1 /*:array*/) {
  x = $$1;
};
const arr = $([1, 2]);
g(...arr, 10, 20, 30, 40, 50, 60);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
const b = function($$0,$$1 ) {
  const c = $$1;
  debugger;
  a = c;
  return undefined;
};
const d = [ 1, 2 ];
const e = $( d );
b( ...e, 10, 20, 30, 40, 50, 60 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, ...$$1 /*:array*/) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = b;
    return undefined;
  };
  let tmpCalleeParam = [1, 2];
  const arr = $(tmpCalleeParam);
  g(...arr, 10, 20, 30, 40, 50, 60);
  return undefined;
};
let x = 0;
f();
$(x);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2]
 - 2: [2, 10, 20, 30, 40, 50, 60]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
