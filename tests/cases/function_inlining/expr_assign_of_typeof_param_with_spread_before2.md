# Preval test case

# expr_assign_of_typeof_param_with_spread_before2.md

> Function inlining > Expr assign of typeof param with spread before2
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param.

The call has a spread before the param index so we must bail.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b) {
    x = typeof b;
  }
  const arr = $(['uh', 'oh', 'no']);
  g(...arr, 10, 20, 30, 40, 50, 60);
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
const tmpCalleeParam /*:array*/ = [`uh`, `oh`, `no`];
const arr /*:unknown*/ = $(tmpCalleeParam);
g(...arr, 10, 20);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 0;
const g = function ($$0, b) {
  x = typeof b;
};
const arr = $([`uh`, `oh`, `no`]);
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
  a = typeof c;
  return undefined;
};
const d = [ "uh", "oh", "no" ];
const e = $( d );
b( ...e, 10, 20 );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['uh', 'oh', 'no']
 - 2: 'string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
