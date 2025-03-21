# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Bindings > Switch case > Auto ident computed simple complex assign complex member
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 10, d: 20 };

    let a = (b[$("c")] = $(b)[$("d")]);
    $(a, b);
}
`````


## Settled


`````js filename=intro
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
const tmpClusterSSA_b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(tmpClusterSSA_b);
const tmpCompProp /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
tmpClusterSSA_b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
$(tmpNestedAssignPropRhs, tmpClusterSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignComMemberProp = $(`c`);
const tmpClusterSSA_b = { c: 10, d: 20 };
const tmpCompObj = $(tmpClusterSSA_b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
tmpClusterSSA_b[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
$(tmpNestedAssignPropRhs, tmpClusterSSA_b);
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
$( e, b );
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
 - 4: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
