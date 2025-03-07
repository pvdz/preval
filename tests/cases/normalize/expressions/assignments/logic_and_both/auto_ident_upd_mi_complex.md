# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = --$($(b)).x) && (a = --$($(b)).x));
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam$1 /*:unknown*/ = $(b);
const tmpNestedAssignObj /*:unknown*/ = $(tmpCalleeParam$1);
const tmpBinLhs /*:unknown*/ = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs /*:number*/ = tmpBinLhs - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
let tmpClusterSSA_a /*:unknown*/ = tmpNestedPropCompoundComplexRhs;
if (tmpNestedPropCompoundComplexRhs) {
  const tmpCalleeParam$3 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedObj /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpBinLhs$1 /*:unknown*/ = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs /*:number*/ = tmpBinLhs$1 - 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  tmpClusterSSA_a = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
} else {
  $(tmpNestedPropCompoundComplexRhs);
}
$(tmpClusterSSA_a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpNestedAssignObj = $($(b));
const tmpNestedPropCompoundComplexRhs = tmpNestedAssignObj.x - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
let tmpClusterSSA_a = tmpNestedPropCompoundComplexRhs;
if (tmpNestedPropCompoundComplexRhs) {
  const varInitAssignLhsComputedObj = $($(b));
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedObj.x - 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  tmpClusterSSA_a = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
} else {
  $(tmpNestedPropCompoundComplexRhs);
}
$(tmpClusterSSA_a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = --$($(b)).x) && (a = --$($(b)).x));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(b);
const tmpNestedAssignObj = $(tmpCalleeParam$1);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
a = tmpNestedPropCompoundComplexRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCalleeParam$3 = $(b);
  const varInitAssignLhsComputedObj = $(tmpCalleeParam$3);
  const tmpBinLhs$1 = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs$1 - 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d - 1;
c.x = e;
let f = e;
if (e) {
  const g = $( a );
  const h = $( g );
  const i = h.x;
  const j = i - 1;
  h.x = j;
  f = j;
  $( j );
}
else {
  $( e );
}
$( f, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 0
 - 4: 0, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
