# Preval test case

# expr_assign_of_bin_lit_param.md

> Function inlining > Expr assign of bin lit param
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b) {
    x = 100 + b;
  }
  g(10, 20, 30, 40, 50, 60);
}
f();
$(x);
`````

## Settled


`````js filename=intro
$(120);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(120);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, $$1) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = 100 + b;
  };
  g(10, 20, 30, 40, 50, 60);
};
let x = 0;
f();
$(x);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function ($$0, $$1) {
    let a = $$0;
    let b = $$1;
    debugger;
    x = 100 + b;
    return undefined;
  };
  g(10, 20, 30, 40, 50, 60);
  return undefined;
};
let x = 0;
f();
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 120 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 120
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
