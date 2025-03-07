# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b)).c) && (a = (1, 2, $(b)).c));
$(a, b);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpAssignRhsProp /*:unknown*/ = $(b);
let tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsProp.c;
const tmpCalleeParam /*:unknown*/ = tmpClusterSSA_a;
if (tmpClusterSSA_a) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCompObj.c;
  tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(tmpClusterSSA_a, b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { c: 1 };
let tmpClusterSSA_a = $(b).c;
const tmpCalleeParam = tmpClusterSSA_a;
if (tmpClusterSSA_a) {
  const tmpNestedComplexRhs = $(b).c;
  tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(tmpClusterSSA_a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b)).c) && (a = (1, 2, $(b)).c));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCompObj = $(b);
  const tmpNestedComplexRhs = tmpCompObj.c;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
let c = b.c;
const d = c;
if (c) {
  const e = $( a );
  const f = e.c;
  c = f;
  $( f );
}
else {
  $( d );
}
$( c, a );
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
