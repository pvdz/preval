# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident unary simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let x = 1;

  let a = typeof x;
  $(a, x);
}
$(f());
`````


## Settled


`````js filename=intro
$(`number`, 1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`, 1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "number", 1 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let a = typeof x;
  $(a, x);
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
 - 1: 'number', 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
