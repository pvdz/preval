# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident ident
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = 1;

  let a = b;
  $(a, b);
}
$(f());
`````


## Settled


`````js filename=intro
$(1, 1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, 1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1, 1 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = 1;
  let a = b;
  $(b, b);
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
 - 1: 1, 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
