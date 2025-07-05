# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = { x: 1, y: 2, z: 3 };
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const a /*:object*/ /*truthy*/ = { x: 1, y: 2, z: 3 };
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: 1, y: 2, z: 3 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
$( a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  a = { x: 1, y: 2, z: 3 };
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
 - 1: { x: '1', y: '2', z: '3' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
