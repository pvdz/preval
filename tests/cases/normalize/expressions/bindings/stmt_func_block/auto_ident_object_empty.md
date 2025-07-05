# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident object empty
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let a = {};
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = {};
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({});
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
$( a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let a = {};
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
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
