# Preval test case

# auto_ident_upd_mi_complex.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident upd mi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = --$($(b)).x) || $(100));
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
if (tmpNestedPropCompoundComplexRhs) {
  $(tmpNestedPropCompoundComplexRhs);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
}
$(tmpNestedPropCompoundComplexRhs, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpNestedAssignObj = $($(b));
const tmpNestedPropCompoundComplexRhs = tmpNestedAssignObj.x - 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
if (tmpNestedPropCompoundComplexRhs) {
  $(tmpNestedPropCompoundComplexRhs);
} else {
  $($(100));
}
$(tmpNestedPropCompoundComplexRhs, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = --$($(b)).x) || $(100));
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
} else {
  tmpCalleeParam = $(100);
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
if (e) {
  $( e );
}
else {
  const f = $( 100 );
  $( f );
}
$( e, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 100
 - 4: 100
 - 5: 0, { x: '0' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
