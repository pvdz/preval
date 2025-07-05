# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident delete computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = delete $(arg)["y"]);
}
$(f());
$(a, arg);
`````


## Settled


`````js filename=intro
const arg /*:object*/ /*truthy*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
const tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, arg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
const tmpClusterSSA_a = delete tmpDeleteObj.y;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, arg);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = delete b.y;
$( c );
$( c, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  return a;
};
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, arg);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '1' }
 - 2: true
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
