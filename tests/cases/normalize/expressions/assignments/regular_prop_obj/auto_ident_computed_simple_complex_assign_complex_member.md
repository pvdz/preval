# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident computed simple complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
let obj = {};
(a = b[$("c")] = $(b)[$("d")]).a;
$(a, b);
`````


## Settled


`````js filename=intro
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj$1[tmpCalleeParam];
b[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpNestedPropAssignRhs.a;
$(tmpNestedPropAssignRhs, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignComMemberProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj$1 = $(b);
const tmpCalleeParam = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj$1[tmpCalleeParam];
b[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpNestedPropAssignRhs.a;
$(tmpNestedPropAssignRhs, b);
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
e.a;
$( e, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpNestedAssignComMemberObj = b;
const tmpNestedAssignComMemberProp = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCalleeParam = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj$1[tmpCalleeParam];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
const tmpCompObj = a;
tmpCompObj.a;
$(a, b);
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
