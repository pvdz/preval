# Preval test case

# expr_assign_of_rest_param.md

> Function inlining > Expr assign of rest param
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param and the call uses a spread that covers this param.

We cannot inline this here because at static time we cannot guarantee the contents of the array (edge cases aside).

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, ...b) {
    x = b;
  }
  const arr = $([1, 2])
  g(10, 20, 30, 40, 50, 60);
}
f();
$(x);
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = 0;
const g /*:(array)=>undefined*/ = function (...$$0 /*:array*/) {
  const b /*:array*/ = $$0;
  debugger;
  x = b;
  return undefined;
};
const tmpCalleeParam /*:array*/ = [1, 2];
$(tmpCalleeParam);
g(20, 30, 40, 50, 60);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
const g = function (...$$0 /*:array*/) {
  x = $$0;
};
$([1, 2]);
g(20, 30, 40, 50, 60);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 0;
const b = function($$0 ) {
  const c = $$0;
  debugger;
  a = c;
  return undefined;
};
const d = [ 1, 2 ];
$( d );
b( 20, 30, 40, 50, 60 );
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
  g(10, 20, 30, 40, 50, 60);
  return undefined;
};
let x = 0;
f();
$(x);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2]
 - 2: [20, 30, 40, 50, 60]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
