# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident computed complex simple assign complex member
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = ($(b)["c"] = $(b)[$("d")]);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
tmpInitAssignLhsComputedObj.c = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpInitAssignLhsComputedObj = $(b);
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam];
tmpInitAssignLhsComputedObj.c = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs, b);
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
$( e, a );
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
 - 4: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
