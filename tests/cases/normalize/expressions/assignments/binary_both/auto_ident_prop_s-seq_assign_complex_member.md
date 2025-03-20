# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> Normalize > Expressions > Assignments > Binary both > Auto ident prop s-seq assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b).c = $(b)[$("d")]) + (a = (1, 2, b).c = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
b.c = tmpNestedAssignPropRhs;
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCompProp$1 /*:unknown*/ = $(`d`);
const tmpNestedAssignPropRhs$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
b.c = tmpNestedAssignPropRhs$1;
const tmpCalleeParam /*:primitive*/ = tmpNestedAssignPropRhs + tmpNestedAssignPropRhs$1;
$(tmpCalleeParam);
$(tmpNestedAssignPropRhs$1, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
b.c = tmpNestedAssignPropRhs;
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`d`);
const tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
b.c = tmpNestedAssignPropRhs$1;
$(tmpNestedAssignPropRhs + tmpNestedAssignPropRhs$1);
$(tmpNestedAssignPropRhs$1, b);
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
const e = $( a );
const f = $( "d" );
const g = e[ f ];
a.c = g;
const h = d + g;
$( h );
$( g, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: { c: '20', d: '20' }
 - 4: 'd'
 - 5: 40
 - 6: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
