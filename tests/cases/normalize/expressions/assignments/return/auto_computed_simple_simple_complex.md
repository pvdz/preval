# Preval test case

# auto_computed_simple_simple_complex.md

> Normalize > Expressions > Assignments > Return > Auto computed simple simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = { b: $(1) });
}
$(f());
a["b"] = $(2);
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpClusterSSA_a /*:object*/ /*truthy*/ = { b: tmpObjLitVal };
$(tmpClusterSSA_a);
const tmpAssignMemRhs /*:unknown*/ = $(2);
tmpClusterSSA_a.b = tmpAssignMemRhs;
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpClusterSSA_a = { b: tmpObjLitVal };
$(tmpClusterSSA_a);
tmpClusterSSA_a.b = $(2);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
$( b );
const c = $( 2 );
b.b = c;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  return a;
};
let a = { a: 999, b: 1000 };
let tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpAssignMemLhsObj = a;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.b = tmpAssignMemRhs;
$(a);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: 2
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
