# Preval test case

# expr_assign_of_spread_param_in.md

> Function inlining > Expr assign of spread param in
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param and the call uses a spread that covers this param.

We cannot inline this here because at static time we cannot guarantee the contents of the array (edge cases aside).

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b, c, d, e) {
    x = d;
  }
  const arr = $([1, 2])
  g(10, 20, ...arr, 30, 40, 50, 60);
}
f();
$(x);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 0;
const g /*:(unused, unused, unused, unknown, unused)=>undefined*/ = function ($$0, $$1, $$2, $$3, $$4) {
  const d /*:unknown*/ = $$3;
  debugger;
  x = d;
  return undefined;
};
const tmpCalleeParam /*:array*/ = [1, 2];
const arr /*:unknown*/ = $(tmpCalleeParam);
g(10, 20, ...arr, 30, 40, 50);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
const g = function ($$0, $$1, $$2, d, $$4) {
  x = d;
};
const arr = $([1, 2]);
g(10, 20, ...arr, 30, 40, 50);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
const b = function($$0,$$1,$$2,$$3,$$4 ) {
  const c = $$3;
  debugger;
  a = c;
  return undefined;
};
const d = [ 1, 2 ];
const e = $( d );
b( 10, 20, ...e, 30, 40, 50 );
$( a );
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2]
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
