# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident computed s-seq simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$($(100) && (a = (1, 2, b)[$("c")] = $(b)[$("d")]));
$(a, b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
const b /*:object*/ /*truthy*/ = { c: 10, d: 20 };
if (tmpCalleeParam) {
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`c`);
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
  const tmpInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
  b[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  $(tmpInitAssignLhsComputedRhs);
  $(tmpInitAssignLhsComputedRhs, b);
} else {
  $(tmpCalleeParam);
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
const b = { c: 10, d: 20 };
if (tmpCalleeParam) {
  const tmpInitAssignLhsComputedProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCalleeParam$1 = $(`d`);
  const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam$1];
  b[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  $(tmpInitAssignLhsComputedRhs);
  $(tmpInitAssignLhsComputedRhs, b);
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
  const c = $( "c" );
  const d = $( b );
  const e = $( "d" );
  const f = d[ e ];
  b[c] = f;
  $( f );
  $( f, b );
}
else {
  $( a );
  const g = {
    a: 999,
    b: 1000,
  };
  $( g, b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpInitAssignLhsComputedObj = b;
  const tmpInitAssignLhsComputedProp = $(`c`);
  const tmpCompObj = $(b);
  const tmpCalleeParam$1 = $(`d`);
  const tmpInitAssignLhsComputedRhs = tmpCompObj[tmpCalleeParam$1];
  tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = tmpInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
} else {
  $(tmpCalleeParam);
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
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
