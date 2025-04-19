# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident computed complex complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $(b)[$("c")] = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const b /*:object*/ = { c: 10, d: 20 };
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, b);
} else {
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
  const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  $(tmpInitAssignLhsComputedRhs);
  $(tmpInitAssignLhsComputedRhs, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(0);
const b = { c: 10, d: 20 };
if (tmpIfTest) {
  $($(100));
  $({ a: 999, b: 1000 }, b);
} else {
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCalleeParam$1 = $(`d`);
  const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam$1];
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  $(tmpInitAssignLhsComputedRhs);
  $(tmpInitAssignLhsComputedRhs, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = {
  c: 10,
  d: 20,
};
if (a) {
  const c = $( 100 );
  $( c );
  const d = {
    a: 999,
    b: 1000,
  };
  $( d, b );
}
else {
  const e = $( b );
  const f = $( "c" );
  const g = $( b );
  const h = $( "d" );
  const i = g[ h ];
  e[f] = i;
  $( i );
  $( i, b );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: { c: '10', d: '20' }
 - 3: 'c'
 - 4: { c: '10', d: '20' }
 - 5: 'd'
 - 6: 20
 - 7: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
