# Preval test case

# auto_seq_complex_computed_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto seq complex computed complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) + (a = { b: $(1) }));
($(1), $(a))[$("b")] = $(2);
$(a);
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpObjLitVal$1 /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal };
const tmpClusterSSA_a /*:object*/ = { b: tmpObjLitVal$1 };
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(1);
const tmpAssignComMemLhsObj /*:unknown*/ = $(tmpClusterSSA_a);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
const tmpAssignComputedRhs /*:unknown*/ = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = $(1);
const a = { b: tmpObjLitVal };
const tmpClusterSSA_a = { b: tmpObjLitVal$1 };
$(a + tmpClusterSSA_a);
$(1);
const tmpAssignComMemLhsObj = $(tmpClusterSSA_a);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) + (a = { b: $(1) }));
($(1), $(a))[$(`b`)] = $(2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpBinBothLhs = a;
const tmpObjLitVal$1 = $(1);
a = { b: tmpObjLitVal$1 };
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(1);
const tmpAssignComMemLhsObj = $(a);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = { b: a };
const d = { b: b };
const e = c + d;
$( e );
$( 1 );
const f = $( d );
const g = $( "b" );
const h = $( 2 );
f[g] = h;
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: '[object Object][object Object]'
 - 4: 1
 - 5: { b: '1' }
 - 6: 'b'
 - 7: 2
 - 8: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
