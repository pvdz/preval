# Preval test case

# expr_assign_to_typeof_closure_param.md

> Function inlining > Expr assign to typeof closure param
>
> A function that does a simple thing may need to be inlined in trivial cases.

The parameter must be mapped to the arg when inlining g.

## Input

`````js filename=intro
function f() {
  let a = 20;
  function g(x) {
    a = typeof x;
  }
  g(10);
  return a;
}
$(f());
`````


## Settled


`````js filename=intro
$(`number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "number" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
