# Preval test case

# expr_assign_to_typeof_closure_lit.md

> Function inlining > Expr assign to typeof closure lit
>
> A function that does a simple thing may need to be inlined in trivial cases.

## Input

`````js filename=intro
function f() {
  let a = 20;
  function g() {
    a = typeof 10;
  }
  g();
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
