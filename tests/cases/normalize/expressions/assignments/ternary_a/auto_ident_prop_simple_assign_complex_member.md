# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident prop simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = b.c = $(b)[$("d")]) ? $(100) : $(200));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCalleeParam$1 /*:unknown*/ = $(`d`);
const tmpNestedPropAssignRhs /*:unknown*/ = tmpCompObj[tmpCalleeParam$1];
b.c = tmpNestedPropAssignRhs;
if (tmpNestedPropAssignRhs) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(tmpNestedPropAssignRhs, b);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(tmpNestedPropAssignRhs, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 10, d: 20 };
const tmpCompObj = $(b);
const tmpCalleeParam$1 = $(`d`);
const tmpNestedPropAssignRhs = tmpCompObj[tmpCalleeParam$1];
b.c = tmpNestedPropAssignRhs;
if (tmpNestedPropAssignRhs) {
  $($(100));
  $(tmpNestedPropAssignRhs, b);
} else {
  $($(200));
  $(tmpNestedPropAssignRhs, b);
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
if (d) {
  const e = $( 100 );
  $( e );
  $( d, a );
}
else {
  const f = $( 200 );
  $( f );
  $( d, a );
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
 - 3: 100
 - 4: 100
 - 5: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
