# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > Binary right > Auto ident prop complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$($(100) + (a = $(b).c = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
const tmpNestedAssignObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + tmpNestedPropAssignRhs;
$(tmpCalleeParam);
$(tmpNestedPropAssignRhs, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const b = { c: 10, d: 20 };
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam$1];
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
$(tmpBinBothLhs + tmpNestedPropAssignRhs);
$(tmpNestedPropAssignRhs, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  c: 10,
  d: 20,
};
const c = $( b );
const d = $( b );
const e = $( "d" );
const f = d[ e ];
c.c = f;
const g = a + f;
$( g );
$( f, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCalleeParam$1];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
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
 - 1: 100
 - 2: { c: '10', d: '20' }
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 120
 - 6: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
