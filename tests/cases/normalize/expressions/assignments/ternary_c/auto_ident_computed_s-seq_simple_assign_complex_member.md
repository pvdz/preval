# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = (1, 2, b)[$("c")] = $(b)[$("d")]));
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
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`d`);
  const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
  b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
  $(varInitAssignLhsComputedRhs, b);
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
  const varInitAssignLhsComputedProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`d`);
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
  $(varInitAssignLhsComputedRhs, b);
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
  const e = $( "c" );
  const f = $( b );
  const g = $( "d" );
  const h = f[ g ];
  b[e] = h;
  $( h );
  $( h, b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 20
 - 6: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
