# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident new computed s-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { $ };

  let a = new (1, 2, b)["$"](1);
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = new $(1);
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $(1));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $( 1 );
$( a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { $: $ };
  const tmpCompObj = b;
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
 - 1: 1
 - 2: {}
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
