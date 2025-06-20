# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident computed complex simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[($(b)["c"] = $(b)[$("d")])];
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
tmpInitAssignLhsComputedObj.c = tmpInitAssignLhsComputedRhs;
$coerce(tmpInitAssignLhsComputedRhs, `string`);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpInitAssignLhsComputedObj = $(b);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpInitAssignLhsComputedRhs = tmpCompObj$1[tmpCalleeParam$1];
tmpInitAssignLhsComputedObj.c = tmpInitAssignLhsComputedRhs;
$coerce(tmpInitAssignLhsComputedRhs, `string`);
$({ a: 999, b: 1000 }, b);
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
$coerce( e, "string" );
const f = {
  a: 999,
  b: 1000,
};
$( f, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpInitAssignLhsComputedObj = $(b);
const tmpCompObj$1 = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpInitAssignLhsComputedRhs = tmpCompObj$1[tmpCalleeParam$1];
tmpInitAssignLhsComputedObj.c = tmpInitAssignLhsComputedRhs;
const tmpCalleeParam = tmpInitAssignLhsComputedRhs;
tmpCompObj[tmpCalleeParam];
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
 - 4: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
