# Preval test case

# auto_ident_computed_c-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident computed c-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(
  (a = (1, 2, $(b))[$("c")] = $(b)[$("d")]) &&
    (a = (1, 2, $(b))[$("c")] = $(b)[$("d")])
);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCalleeParam$3 /*:unknown*/ = $(`d`);
  const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$3];
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  $(tmpInitAssignLhsComputedRhs);
  $(tmpInitAssignLhsComputedRhs, b);
} else {
  $(tmpNestedAssignPropRhs);
  $(tmpNestedAssignPropRhs, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`c`);
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCalleeParam$1];
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`c`);
  const tmpCompObj$1 = $(b);
  const tmpCalleeParam$3 = $(`d`);
  const tmpInitAssignLhsComputedRhs = tmpCompObj$1[tmpCalleeParam$3];
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  $(tmpInitAssignLhsComputedRhs);
  $(tmpInitAssignLhsComputedRhs, b);
} else {
  $(tmpNestedAssignPropRhs);
  $(tmpNestedAssignPropRhs, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( "c" );
const d = $( a );
const e = $( "d" );
const f = d[ e ];
b[c] = f;
if (f) {
  const g = $( a );
  const h = $( "c" );
  const i = $( a );
  const j = $( "d" );
  const k = i[ j ];
  g[h] = k;
  $( k );
  $( k, a );
}
else {
  $( f );
  $( f, a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: { c: '20', d: '20' }
 - 6: 'c'
 - 7: { c: '20', d: '20' }
 - 8: 'd'
 - 9: 20
 - 10: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
