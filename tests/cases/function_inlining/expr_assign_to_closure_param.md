# Preval test case

# expr_assign_to_closure_param.md

> Function inlining > Expr assign to closure param
>
> A function that does a simple thing may need to be inlined in trivial cases.

The parameter must be mapped to the arg when inlining g.

## Input

`````js filename=intro
function f() {
  let a = 20;
  function g(x) {
    a = x;
  }
  g(10);
  return a;
}
$(f());
`````


## Settled


`````js filename=intro
$(10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
