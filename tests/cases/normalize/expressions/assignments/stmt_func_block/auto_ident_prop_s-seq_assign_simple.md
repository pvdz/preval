# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident prop s-seq assign simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = { a: 999, b: 1000 };
    a = (1, 2, b).c = 2;
    $(a, b);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 2 };
$(2, b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2, { c: 2 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 2 };
$( 2, a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  const tmpNestedAssignObj = b;
  const tmpNestedPropAssignRhs = 2;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(tmpNestedPropAssignRhs, b);
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
 - 1: 2, { c: '2' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
