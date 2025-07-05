# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident unary typeof simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let arg = 1;

  let a = { a: 999, b: 1000 };
  typeof arg;
  $(a, arg);
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, 1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 999, b: 1000 }, 1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
$( a, 1 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let arg = 1;
  let a = { a: 999, b: 1000 };
  $(a, arg);
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
 - 1: { a: '999', b: '1000' }, 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
