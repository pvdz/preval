# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident unary tilde simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let arg = 1;

  let a = ~arg;
  $(a, arg);
}
$(f());
`````


## Settled


`````js filename=intro
$(-2, 1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-2, 1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -2, 1 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let arg = 1;
  let a = ~arg;
  $(a, arg);
  return undefined;
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
 - 1: -2, 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
