# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident computed simple simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$($(100) && (a = b["c"] = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
const b /*:object*/ = { c: 10, d: 20 };
if (tmpCalleeParam) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`d`);
  const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
  b.c = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
  $(varInitAssignLhsComputedRhs, b);
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
const b = { c: 10, d: 20 };
if (tmpCalleeParam) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  b.c = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
  $(varInitAssignLhsComputedRhs, b);
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 }, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  c: 10,
  d: 20,
};
if (a) {
  const c = $( b );
  const d = $( "d" );
  const e = c[ d ];
  b.c = e;
  $( e );
  $( e, b );
}
else {
  $( a );
  const f = {
    a: 999,
    b: 1000,
  };
  $( f, b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20
 - 5: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
