# Preval test case

# auto_seq_complex_computed_complex.md

> Normalize > Expressions > Assignments > Stmt func top > Auto seq complex computed complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  (a = { b: $(1) })($(1), $(a))[$("b")] = $(2);
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal };
const tmpCalleeParam$1 /*:unknown*/ = $(a);
const tmpAssignComMemLhsObj /*:unknown*/ = a(tmpCalleeParam, tmpCalleeParam$1);
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
const tmpAssignComMemLhsObj = a(tmpCalleeParam, $(a));
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  (a = { b: $(1) })($(1), $(a))[$(`b`)] = $(2);
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let tmpCallCallee = a;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(a);
  const tmpAssignComMemLhsObj = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  const tmpAssignComMemLhsProp = $(`b`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpAssignComputedRhs = $(2);
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a);
  return undefined;
};
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = { b: a };
const d = $( c );
const e = c( b, d );
const f = $( "b" );
const g = $( 2 );
e[f] = g;
$( c );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { b: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
