# Preval test case

# expr_assign_of_bin_param_lit.md

> Function inlining > Expr assign of bin param lit
>
> A function that does a simple thing may need to be inlined in trivial cases.

In this case the assignment used a param.

## Input

`````js filename=intro
let x = 0;
function f() {
  function g(a, b) {
    x = a + 100;
  }
  g(10, 20, 30, 40, 50, 60);
}
f();
$(x);
`````


## Settled


`````js filename=intro
$(110);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(110);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 110 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 110
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
