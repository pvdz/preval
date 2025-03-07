# Preval test case

# expr_assign_of_bin_rest_param_with_spread_on.md

> Function inlining > Expr assign of bin rest param with spread on
>
> A function that does a simple thing may need to be inlined in trivial cases.

The assignment in g uses a rest param. There are some cases where we can still transform this.

In this case, the function is called with a spread on the rest param index so we should transform.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, ...b) {
    x = a + b;
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
const g /*:(unknown, array)=>undefined*/ = function ($$0, ...$$1 /*:array*/) {
  const a /*:unknown*/ = $$0;
  const b /*:array*/ = $$1;
  debugger;
  x = a + b;
  return undefined;
};
const tmpCalleeParam /*:array*/ = [1, 2];
const arr /*:unknown*/ = $(tmpCalleeParam);
g(10, ...arr, 20, 30, 40, 50, 60);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
const g = function (a, b) {
  x = a + b;
};
const arr = $([1, 2]);
g(10, ...arr, 20, 30, 40, 50, 60);
$(x);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, ...$$1 /*:array*/) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = a + b;
  };
  const arr = $([1, 2]);
  g(10, ...arr, 20, 30, 40, 50, 60);
};
let x = 0;
f();
$(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, ...$$1 /*:array*/) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = a + b;
    return undefined;
  };
  const tmpCalleeParam = [1, 2];
  const arr = $(tmpCalleeParam);
  g(10, ...arr, 20, 30, 40, 50, 60);
  return undefined;
};
let x = 0;
f();
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
  a = c + d;
  return undefined;
};
const e = [ 1, 2 ];
const f = $( e );
b( 10, ...f, 20, 30, 40, 50, 60 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 2]
 - 2: '101,2,20,30,40,50,60'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: BAD!!
 - 1: [1, 2]
 - 2: 11
 - eval returned: undefined
