# Preval test case

# expr_assign_of_param.md

> Function inlining > Expr assign of param
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b) {
    x = b;
  }
  g(10, 20, 30, 40, 50, 60);
}
f();
$(x);
`````


## Settled


`````js filename=intro
$(20);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(20);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 20 );
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
 - 1: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
