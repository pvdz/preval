# Preval test case

# expr_assign_to_param_lit.md

> Function inlining > Expr assign to param lit
>
> A function that does a simple thing may need to be inlined in trivial cases.

## Input

`````js filename=intro
function f() {
  function g(a) {
    a = 10;
  }
  g();
}
$(f());
`````


## Settled


`````js filename=intro
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
