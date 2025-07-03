# Preval test case

# expr_assign_of_bin_spread_param_in.md

> Function inlining > Expr assign of bin spread param in
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param and the call uses a spread that covers this param.

We cannot inline this here because at static time we cannot guarantee the contents of the array (edge cases aside).

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b, c, d, e) {
    x = a + d;
  }
  const arr = $([1, 2])
  g(10, 20, ...arr, 30, 40, 50, 60);
}
f();
$(x);
`````


## Settled


`````js filename=intro
let x /*:primitive*/ = 0;
const g /*:(unknown, unused, unused, unknown, unused)=>undefined*/ = function ($$0, $$1, $$2, $$3, $$4) {
  const a /*:unknown*/ = $$0;
  const d /*:unknown*/ = $$3;
  debugger;
  x = a + d;
  return undefined;
};
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2];
const arr /*:unknown*/ = $(tmpCalleeParam);
g(10, 20, ...arr, 30, 40, 50);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
const g = function (a, $$1, $$2, d, $$4) {
  x = a + d;
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
  const c = $$0;
  const d = $$3;
  debugger;
  a = c + d;
  return undefined;
};
const e = [ 1, 2 ];
const f = $( e );
b( 10, 20, ...f, 30, 40, 50 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, $$1, $$2, $$3, $$4) {
    let a = $$0;
    let b = $$1;
    let c = $$2;
    let d = $$3;
    let e = $$4;
    debugger;
    x = a + d;
    return undefined;
  };
  let tmpCalleeParam = [1, 2];
  const arr = $(tmpCalleeParam);
  g(10, 20, ...arr, 30, 40, 50, 60);
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
 - 1: [1, 2]
 - 2: 12
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
