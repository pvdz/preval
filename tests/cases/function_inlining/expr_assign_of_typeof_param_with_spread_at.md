# Preval test case

# expr_assign_of_typeof_param_with_spread_at.md

> Function inlining > Expr assign of typeof param with spread at
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param.

The call has a spread at the param index so we must bail.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b) {
    x = typeof b;
  }
  const arr = $([1, 2, 3]);
  g(10, ...arr, 20, 30, 40, 50, 60);
}
f();
$(x);
`````


## Settled


`````js filename=intro
let x /*:primitive*/ = 0;
const g /*:(unused, unknown)=>undefined*/ = function ($$0, $$1) {
  const b /*:unknown*/ = $$1;
  debugger;
  x = typeof b;
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
const g = function ($$0, b) {
  x = typeof b;
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
  const c = $$1;
  debugger;
  a = typeof c;
  return undefined;
};
const d = [ 1, 2, 3 ];
const e = $( d );
b( 10, ...e, 20 );
$( a );
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
