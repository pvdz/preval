# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Binary both > Auto ident computed complex simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = $(b)["c"] = $(b)[$("d")]) + (a = $(b)["c"] = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
const tmpNestedAssignObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
const tmpNestedAssignObj$1 /*:unknown*/ = $(b);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCalleeParam$3 /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$3];
tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs$1;
const tmpCalleeParam /*:primitive*/ = tmpNestedPropAssignRhs + tmpNestedPropAssignRhs$1;
$(tmpCalleeParam);
$(tmpNestedPropAssignRhs$1, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam$1];
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
const tmpNestedAssignObj$1 = $(b);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$3 = $(`d`);
const tmpNestedPropAssignRhs$1 = tmpCompObj$1[tmpCalleeParam$3];
tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs$1;
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
const c = $( a );
const d = $( "d" );
const e = c[ d ];
b.c = e;
const f = $( a );
const g = $( a );
const h = $( "d" );
const i = g[ h ];
f.c = i;
const j = e + i;
$( j );
$( i, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCalleeParam$1];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
const tmpBinBothLhs = a;
const tmpNestedAssignObj$1 = $(b);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$3 = $(`d`);
const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCalleeParam$3];
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs$1;
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
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: { c: '20', d: '20' }
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 40
 - 8: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
