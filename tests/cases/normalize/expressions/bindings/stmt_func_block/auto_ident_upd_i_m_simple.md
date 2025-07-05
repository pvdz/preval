# Preval test case

# auto_ident_upd_i_m_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident upd i m simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = 1;

    let a = b--;
    $(a, b);
  }
}
$(f());
`````


## Settled


`````js filename=intro
$(1, 0);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, 0);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1, 0 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = 1;
  const tmpPostUpdArgIdent = $coerce(b, `number`);
  b = tmpPostUpdArgIdent - 1;
  let a = tmpPostUpdArgIdent;
  $(tmpPostUpdArgIdent, b);
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
 - 1: 1, 0
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
