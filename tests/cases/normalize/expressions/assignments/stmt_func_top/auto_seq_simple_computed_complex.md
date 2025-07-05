# Preval test case

# auto_seq_simple_computed_complex.md

> Normalize > Expressions > Assignments > Stmt func top > Auto seq simple computed complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  (a = { b: $(1) })($(1), a)[$("b")] = $(2);
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:object*/ /*truthy*/ = { b: tmpObjLitVal };
const tmpAssignComMemLhsObj /*:unknown*/ = a(tmpCalleeParam, a);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
const tmpAssignComputedRhs /*:unknown*/ = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpCalleeParam = $(1);
const a = { b: tmpObjLitVal };
const tmpAssignComMemLhsObj = a(tmpCalleeParam, a);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = { b: a };
const d = c( b, c );
const e = $( "b" );
const f = $( 2 );
d[e] = f;
$( c );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  const tmpCallComplexCallee = a;
  const tmpCallCallee = tmpCallComplexCallee;
  let tmpCalleeParam = $(1);
  let tmpCalleeParam$1 = a;
  const tmpAssignComMemLhsObj = tmpCallComplexCallee(tmpCalleeParam, a);
  const tmpAssignComMemLhsProp = $(`b`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpAssignComputedRhs = $(2);
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a);
  return undefined;
};
let tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
