# Preval test case

# auto_ident_nested_member_complex_call.md

> Normalize > Expressions > Bindings > Switch case > Auto ident nested member complex call
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 },
      c = { y: 2 },
      d = 3;

    let a = ($(b)[$("x")] = $(c)[$("y")] = $(d));
    $(a, b, c, d);
}
`````


## Settled


`````js filename=intro
const tmpClusterSSA_b /*:object*/ = { x: 1 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(tmpClusterSSA_b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`x`);
const tmpClusterSSA_c /*:object*/ = { y: 2 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(tmpClusterSSA_c);
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`y`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(3);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs, tmpClusterSSA_b, tmpClusterSSA_c, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_b = { x: 1 };
const tmpNestedAssignComMemberObj = $(tmpClusterSSA_b);
const tmpNestedAssignComMemberProp = $(`x`);
const tmpClusterSSA_c = { y: 2 };
const tmpInitAssignLhsComputedObj = $(tmpClusterSSA_c);
const tmpInitAssignLhsComputedProp = $(`y`);
const tmpInitAssignLhsComputedRhs = $(3);
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs, tmpClusterSSA_b, tmpClusterSSA_c, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( "x" );
const d = { y: 2 };
const e = $( d );
const f = $( "y" );
const g = $( 3 );
e[f] = g;
b[c] = g;
$( g, a, d, 3 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 3
 - 6: 3, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
