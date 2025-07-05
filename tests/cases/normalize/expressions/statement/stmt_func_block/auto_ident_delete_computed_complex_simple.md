# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident delete computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let arg = { y: 1 };

    let a = { a: 999, b: 1000 };
    delete $(arg)["y"];
    $(a, arg);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
delete tmpDeleteObj.y;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, arg);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
delete tmpDeleteObj.y;
$({ a: 999, b: 1000 }, arg);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
delete b.y;
const c = {
  a: 999,
  b: 1000,
};
$( c, a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let arg = { y: 1 };
  let a = { a: 999, b: 1000 };
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
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
 - 1: { y: '1' }
 - 2: { a: '999', b: '1000' }, {}
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
