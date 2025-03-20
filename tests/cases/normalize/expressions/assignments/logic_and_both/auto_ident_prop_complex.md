# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b).c) && (a = $(b).c));
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpAssignRhsProp /*:unknown*/ = $(b);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsProp.c;
if (tmpClusterSSA_a) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCompObj.c;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
} else {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
const tmpClusterSSA_a = $(b).c;
if (tmpClusterSSA_a) {
  const tmpNestedComplexRhs = $(b).c;
  $(tmpNestedComplexRhs);
  $(tmpNestedComplexRhs, b);
} else {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
if (c) {
  const d = $( a );
  const e = d.c;
  $( e );
  $( e, a );
}
else {
  $( c );
  $( c, a );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: '1' }
 - 2: { c: '1' }
 - 3: 1
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
