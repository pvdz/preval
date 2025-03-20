# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(
  (a = (1, 2, b)[$("c")] = $(b)[$("d")]) ||
    (a = (1, 2, b)[$("c")] = $(b)[$("d")])
);
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
if (tmpNestedAssignPropRhs) {
  $(tmpNestedAssignPropRhs);
  $(tmpNestedAssignPropRhs, b);
} else {
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCompProp$1 /*:unknown*/ = $(`d`);
  const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
  b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
  $(varInitAssignLhsComputedRhs, b);
}
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
if (tmpNestedAssignPropRhs) {
  $(tmpNestedAssignPropRhs);
  $(tmpNestedAssignPropRhs, b);
} else {
  const varInitAssignLhsComputedProp = $(`c`);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const varInitAssignLhsComputedRhs = tmpCompObj$1[tmpCompProp$1];
  b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
  $(varInitAssignLhsComputedRhs, b);
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
  $( e );
  $( e, b );
}
else {
  const f = $( "c" );
  const g = $( b );
  const h = $( "d" );
  const i = g[ h ];
  b[f] = i;
  $( i );
  $( i, b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20
 - 5: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
