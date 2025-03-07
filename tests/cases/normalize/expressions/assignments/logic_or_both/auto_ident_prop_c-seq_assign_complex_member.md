# Preval test case

# auto_ident_prop_c-seq_assign_complex_member.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident prop c-seq assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b)).c = $(b)[$("d")]) || (a = (1, 2, $(b)).c = $(b)[$("d")]));
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpNestedAssignObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
tmpNestedAssignObj.c = tmpNestedAssignPropRhs;
let tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  $(tmpNestedAssignPropRhs);
} else {
  const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCompProp$1 /*:unknown*/ = $(`d`);
  const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
  varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
  tmpClusterSSA_a = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
}
$(tmpClusterSSA_a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
tmpNestedAssignObj.c = tmpNestedAssignPropRhs;
let tmpClusterSSA_a = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  $(tmpNestedAssignPropRhs);
} else {
  const varInitAssignLhsComputedObj = $(b);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
  varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
  tmpClusterSSA_a = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
}
$(tmpClusterSSA_a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b)).c = $(b)[$(`d`)]) || (a = (1, 2, $(b)).c = $(b)[$(`d`)]));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const varInitAssignLhsComputedObj = $(b);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
  varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( a );
const d = $( "d" );
const e = c[ d ];
b.c = e;
let f = e;
if (e) {
  $( e );
}
else {
  const g = $( a );
  const h = $( a );
  const i = $( "d" );
  const j = h[ i ];
  g.c = j;
  f = j;
  $( j );
}
$( f, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20
 - 5: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
