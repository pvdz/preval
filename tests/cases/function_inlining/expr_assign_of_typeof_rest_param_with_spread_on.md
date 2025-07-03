# Preval test case

# expr_assign_of_typeof_rest_param_with_spread_on.md

> Function inlining > Expr assign of typeof rest param with spread on
>
> A function that does a simple thing may need to be inlined in trivial cases.

The assignment in g uses a rest param. There are some cases where we can still transform this.

In this case, the function is called with a spread on the rest param index so we should transform.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, ...b) {
    x = typeof b;
  }
  const arr = $([1, 2])
  g(10, ...arr, 20, 30, 40, 50, 60);
}
f();
$(x);
`````


## Settled


`````js filename=intro
let x /*:primitive*/ = 0;
const g /*:(unused, unused)=>undefined*/ = function ($$0, $$1) {
  debugger;
  x = `object`;
  return undefined;
};
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2];
const arr /*:unknown*/ = $(tmpCalleeParam);
g(10, ...arr, 20);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
const g = function ($$0, $$1) {
  x = `object`;
};
const arr = $([1, 2]);
g(10, ...arr, 20);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
const b = function($$0,$$1 ) {
  debugger;
  a = "object";
  return undefined;
};
const c = [ 1, 2 ];
const d = $( c );
b( 10, ...d, 20 );
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
    x = typeof b;
    return undefined;
  };
  let tmpCalleeParam = [1, 2];
  const arr = $(tmpCalleeParam);
  g(10, ...arr, 20, 30, 40, 50, 60);
  return undefined;
};
let x = 0;
f();
$(x);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) drop unused rest param?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2]
 - 2: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
