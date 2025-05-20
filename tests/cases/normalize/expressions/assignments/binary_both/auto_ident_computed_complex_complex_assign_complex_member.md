# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > Binary both > Auto ident computed complex complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = $(b)[$("c")] = $(b)[$("d")]) + (a = $(b)[$("c")] = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpNestedAssignComMemberObj /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
const tmpNestedAssignComMemberObj$1 /*:unknown*/ = $(b);
const tmpNestedAssignComMemberProp$1 /*:unknown*/ = $(`c`);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCalleeParam$3 /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$3];
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
const tmpCalleeParam /*:primitive*/ = tmpNestedPropAssignRhs + tmpNestedPropAssignRhs$1;
$(tmpCalleeParam);
$(tmpNestedPropAssignRhs$1, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $(`c`);
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam$1];
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
const tmpNestedAssignComMemberObj$1 = $(b);
const tmpNestedAssignComMemberProp$1 = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$3 = $(`d`);
const tmpNestedPropAssignRhs$1 = tmpCompObj$1[tmpCalleeParam$3];
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
$(tmpNestedPropAssignRhs + tmpNestedPropAssignRhs$1);
$(tmpNestedPropAssignRhs$1, b);
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
const g = $( a );
const h = $( "c" );
const i = $( a );
const j = $( "d" );
const k = i[ j ];
g[h] = k;
const l = f + k;
$( l );
$( k, a );
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
 - 9: 40
 - 10: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
