# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Logic or both > Auto ident computed complex simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
($(b)["c"] = $(b)[$("d")]) || ($(b)["c"] = $(b)[$("d")]);
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
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpInitAssignLhsComputedRhs) {
  $(a, b);
} else {
  const tmpAssignMemLhsObj /*:unknown*/ = $(b);
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
  const tmpAssignMemRhs /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
  $(a, b);
}
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
const a = { a: 999, b: 1000 };
if (tmpInitAssignLhsComputedRhs) {
  $(a, b);
} else {
  const tmpAssignMemLhsObj = $(b);
  const tmpCompObj$1 = $(b);
  const tmpCalleeParam$1 = $(`d`);
  tmpAssignMemLhsObj.c = tmpCompObj$1[tmpCalleeParam$1];
  $(a, b);
}
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
const f = {
  a: 999,
  b: 1000,
};
if (e) {
  $( f, a );
}
else {
  const g = $( a );
  const h = $( a );
  const i = $( "d" );
  const j = h[ i ];
  g.c = j;
  $( f, a );
}
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
