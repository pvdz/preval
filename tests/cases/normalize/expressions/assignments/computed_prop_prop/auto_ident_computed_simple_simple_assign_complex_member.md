# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident computed simple simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = b["c"] = $(b)[$("d")])];
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCompProp$1 /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
b.c = tmpNestedAssignPropRhs;
const obj /*:object*/ = {};
obj[tmpNestedAssignPropRhs];
$(tmpNestedAssignPropRhs, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj$1[tmpCompProp$1];
b.c = tmpNestedAssignPropRhs;
({}[tmpNestedAssignPropRhs]);
$(tmpNestedAssignPropRhs, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( "d" );
const d = b[ c ];
a.c = d;
const e = {};
e[ d ];
$( d, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
