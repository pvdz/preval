# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident computed simple complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = b[$("c")] = $(b)[$("d")]) && (a = b[$("c")] = $(b)[$("d")]));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
let tmpClusterSSA_a /*:unknown*/ = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCompProp$1 /*:unknown*/ = $(`d`);
  const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
  b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  tmpClusterSSA_a = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
} else {
  $(tmpNestedAssignPropRhs);
}
$(tmpClusterSSA_a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignComMemberProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
let tmpClusterSSA_a = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  const varInitAssignLhsComputedProp = $(`c`);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
  b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  tmpClusterSSA_a = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
} else {
  $(tmpNestedAssignPropRhs);
}
$(tmpClusterSSA_a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$((a = b[$(`c`)] = $(b)[$(`d`)]) && (a = b[$(`c`)] = $(b)[$(`d`)]));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpNestedAssignComMemberObj = b;
const tmpNestedAssignComMemberProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const varInitAssignLhsComputedObj = b;
  const varInitAssignLhsComputedProp = $(`c`);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
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
const a = $( "c" );
const b = {
  c: 10,
  d: 20,
};
const c = $( b );
const d = $( "d" );
const e = c[ d ];
b[a] = e;
let f = e;
if (e) {
  const g = $( "c" );
  const h = $( b );
  const i = $( "d" );
  const j = h[ i ];
  b[g] = j;
  f = j;
  $( j );
}
else {
  $( e );
}
$( f, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 'c'
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 20
 - 8: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
