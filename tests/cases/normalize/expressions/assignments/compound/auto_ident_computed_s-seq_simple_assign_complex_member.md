# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Compound > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a *= (1, 2, b)[$("c")] = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
b[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
const a /*:object*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * tmpInitAssignLhsComputedRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedProp = $(`c`);
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam$1];
b[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
const tmpClusterSSA_a = { a: 999, b: 1000 } * tmpInitAssignLhsComputedRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, b);
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
const f = {
  a: 999,
  b: 1000,
};
const g = f * e;
$( g );
$( g, b );
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
 - 4: NaN
 - 5: NaN, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
