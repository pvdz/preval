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
const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCalleeParam$3 /*:unknown*/ = $(`d`);
  const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$3];
  b[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
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
const tmpNestedAssignComMemberProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCalleeParam$1];
b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
if (tmpNestedAssignPropRhs) {
  const tmpInitAssignLhsComputedProp = $(`c`);
  const tmpCompObj$1 = $(b);
  const tmpCalleeParam$3 = $(`d`);
  const tmpInitAssignLhsComputedRhs = tmpCompObj$1[tmpCalleeParam$3];
  b[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
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
const a = $( "c" );
const b = {
  c: 10,
  d: 20,
};
const c = $( b );
const d = $( "d" );
const e = c[ d ];
b[a] = e;
if (e) {
  const f = $( "c" );
  const g = $( b );
  const h = $( "d" );
  const i = g[ h ];
  b[f] = i;
  $( i );
  $( i, b );
}
else {
  $( e );
  $( e, b );
}
`````


## Todos triggered


None


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
