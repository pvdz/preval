# Preval test case

# expr_assign_of_bin_param.md

> Function inlining > Expr assign of bin param
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b) {
    x = a + b;
  }
  g(10, 20, 30, 40, 50, 60);
}
f();
$(x);
`````


## Settled


`````js filename=intro
$(30);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(30);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 30 );
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
    x = a + b;
    return undefined;
  };
  g(10, 20, 30, 40, 50, 60);
  return undefined;
};
let x = 0;
f();
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
