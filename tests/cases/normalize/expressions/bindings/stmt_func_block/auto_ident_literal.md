# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident literal
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = "foo";
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
$(`foo`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "foo" );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let a = `foo`;
  $(a);
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
 - 1: 'foo'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
