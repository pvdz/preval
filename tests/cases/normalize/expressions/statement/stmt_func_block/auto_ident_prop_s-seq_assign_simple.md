# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident prop s-seq assign simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 1 };

    let a = { a: 999, b: 1000 };
    (1, 2, b).c = 2;
    $(a, b);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const b /*:object*/ /*truthy*/ = { c: 2 };
$(a, b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 999, b: 1000 }, { c: 2 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = { c: 2 };
$( a, b );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  const tmpAssignMemLhsObj = b;
  b.c = 2;
  $(a, b);
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
 - 1: { a: '999', b: '1000' }, { c: '2' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
