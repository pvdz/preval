# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident computed simple simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = b["c"] = $(b)[$("d")]) || $(100));
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
  $(tmpNestedPropAssignRhs);
  $(tmpNestedPropAssignRhs, b);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpCalleeParam);
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
  $(tmpNestedPropAssignRhs);
  $(tmpNestedPropAssignRhs, b);
} else {
  $($(100));
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
  $( d );
  $( d, a );
}
else {
  const e = $( 100 );
  $( e );
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
 - 3: 20
 - 4: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
