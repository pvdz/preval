# Preval test case

# expr_assign_to_closure_lit.md

> Function inlining > Expr assign to closure lit
>
> A function that does a simple thing may need to be inlined in trivial cases.

## Input

`````js filename=intro
function f() {
  let a = 20;
  function g() {
    a = 10;
  }
  g();
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    a = 10;
    return undefined;
  };
  let a = 20;
  g();
  return a;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


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
