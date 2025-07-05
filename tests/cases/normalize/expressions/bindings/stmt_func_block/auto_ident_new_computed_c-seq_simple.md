# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident new computed c-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { $ };

    let a = new (1, 2, $(b))["$"](1);
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
const a /*:object*/ /*truthy*/ = new tmpNewCallee(1);
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $({ $: $ }).$;
$(new tmpNewCallee(1));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = new c( 1 );
$( d );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { $: $ };
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  let a = new tmpNewCallee(1);
  $(a);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support ObjectExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: {}
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
