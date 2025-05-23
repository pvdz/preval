# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > Arr element > Auto ident computed simple complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = b[$("c")] = $(b)[$("d")]) + (a = b[$("c")] = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpNestedAssignComMemberProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
b[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
const tmpNestedAssignComMemberProp$1 /*:unknown*/ = $(`c`);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCalleeParam$3 /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$3];
b[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
const tmpCalleeParam /*:primitive*/ = tmpNestedPropAssignRhs + tmpNestedPropAssignRhs$1;
$(tmpCalleeParam);
$(tmpNestedPropAssignRhs$1, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignComMemberProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam$1];
b[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
const tmpNestedAssignComMemberProp$1 = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$3 = $(`d`);
const tmpNestedPropAssignRhs$1 = tmpCompObj$1[tmpCalleeParam$3];
b[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
$(tmpNestedPropAssignRhs + tmpNestedPropAssignRhs$1);
$(tmpNestedPropAssignRhs$1, b);
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
const f = $( "c" );
const g = $( b );
const h = $( "d" );
const i = g[ h ];
b[f] = i;
const j = e + i;
$( j );
$( i, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpNestedAssignComMemberObj = b;
const tmpNestedAssignComMemberProp = $(`c`);
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCalleeParam$1];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
const tmpBinBothLhs = a;
const tmpNestedAssignComMemberObj$1 = b;
const tmpNestedAssignComMemberProp$1 = $(`c`);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$3 = $(`d`);
const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCalleeParam$3];
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
a = tmpNestedPropAssignRhs$1;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
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
 - 4: 'c'
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 40
 - 8: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
