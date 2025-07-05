# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let arg = { y: 1 };

  let a = { a: 999, b: 1000 };
  delete ($(1), $(2), $(arg)).y;
  $(a, arg);
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(2);
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
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
delete tmpDeleteObj.y;
$({ a: 999, b: 1000 }, arg);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
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
  $(1);
  $(2);
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
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: { a: '999', b: '1000' }, {}
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
