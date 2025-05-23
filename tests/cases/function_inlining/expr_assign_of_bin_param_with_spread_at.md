# Preval test case

# expr_assign_of_bin_param_with_spread_at.md

> Function inlining > Expr assign of bin param with spread at
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param.

The call has a spread at the param index so we must bail.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b) {
    x = a * b;
  }
  const arr = $([1, 2, 3]);
  g(10, ...arr, 20, 30, 40, 50, 60);
}
f();
$(x);
`````


## Settled


`````js filename=intro
let x /*:number*/ = 0;
const g /*:(unknown, unknown)=>undefined*/ = function ($$0, $$1) {
  const a /*:unknown*/ = $$0;
  const b /*:unknown*/ = $$1;
  debugger;
  x = a * b;
  return undefined;
};
const tmpCalleeParam /*:array*/ = [1, 2, 3];
const arr /*:unknown*/ = $(tmpCalleeParam);
g(10, ...arr, 20);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
const g = function (a, b) {
  x = a * b;
};
const arr = $([1, 2, 3]);
g(10, ...arr, 20);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
const b = function($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  a = c * d;
  return undefined;
};
const e = [ 1, 2, 3 ];
const f = $( e );
b( 10, ...f, 20 );
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
    x = a * b;
    return undefined;
  };
  let tmpCalleeParam = [1, 2, 3];
  const arr = $(tmpCalleeParam);
  g(10, ...arr, 20, 30, 40, 50, 60);
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
 - 1: [1, 2, 3]
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
