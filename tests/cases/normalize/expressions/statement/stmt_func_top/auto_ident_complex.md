# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let b = 1;

  let a = { a: 999, b: 1000 };
  $(b);
  $(a, b);
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, 1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$({ a: 999, b: 1000 }, 1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
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
  let b = 1;
  let a = { a: 999, b: 1000 };
  $(b);
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
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
