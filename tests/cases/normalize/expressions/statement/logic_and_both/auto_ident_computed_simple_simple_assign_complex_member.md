# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Logic and both > Auto ident computed simple simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
(b["c"] = $(b)[$("d")]) && (b["c"] = $(b)[$("d")]);
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam /*:unknown*/ = $(`d`);
const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam];
b.c = varInitAssignLhsComputedRhs;
const a /*:object*/ = { a: 999, b: 1000 };
if (varInitAssignLhsComputedRhs) {
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
  const tmpAssignMemRhs /*:unknown*/ = tmpCompObj$1[tmpCalleeParam$1];
  b.c = tmpAssignMemRhs;
  $(a, b);
} else {
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam];
b.c = varInitAssignLhsComputedRhs;
const a = { a: 999, b: 1000 };
if (varInitAssignLhsComputedRhs) {
  const tmpCompObj$1 = $(b);
  const tmpCalleeParam$1 = $(`d`);
  b.c = tmpCompObj$1[tmpCalleeParam$1];
  $(a, b);
} else {
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
const c = $( "d" );
const d = b[ c ];
a.c = d;
const e = {
  a: 999,
  b: 1000,
};
if (d) {
  const f = $( a );
  const g = $( "d" );
  const h = f[ g ];
  a.c = h;
  $( e, a );
}
else {
  $( e, a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: { c: '20', d: '20' }
 - 4: 'd'
 - 5: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
