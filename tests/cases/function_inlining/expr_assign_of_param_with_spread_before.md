# Preval test case

# expr_assign_of_param_with_spread_before.md

> Function inlining > Expr assign of param with spread before
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param.

The call has a spread before the param index so we must bail.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b) {
    x = b;
  }
  const arr = $([1, 2, 3]);
  g(...arr, 10, 20, 30, 40, 50, 60);
}
f();
$(x);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 0;
const g /*:(unused, unknown)=>undefined*/ = function ($$0, $$1) {
  const b /*:unknown*/ = $$1;
  debugger;
  x = b;
  return undefined;
};
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3];
const arr /*:unknown*/ = $(tmpCalleeParam);
g(...arr, 10, 20);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
const g = function ($$0, b) {
  x = b;
};
const arr = $([1, 2, 3]);
g(...arr, 10, 20);
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
const d = [ 1, 2, 3 ];
const e = $( d );
b( ...e, 10, 20 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, $$1) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = b;
    return undefined;
  };
  let tmpCalleeParam = [1, 2, 3];
  const arr = $(tmpCalleeParam);
  g(...arr, 10, 20, 30, 40, 50, 60);
  return undefined;
};
let x = 0;
f();
$(x);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
