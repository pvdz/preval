# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Ternary b > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$($(1) ? (a = b = $(2)) : $(200));
$(a, b);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpClusterSSA_b /*:unknown*/ = $(2);
  $(tmpClusterSSA_b);
  $(tmpClusterSSA_b, tmpClusterSSA_b);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a, 1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpClusterSSA_b = $(2);
  $(tmpClusterSSA_b);
  $(tmpClusterSSA_b, tmpClusterSSA_b);
} else {
  $($(200));
  $({ a: 999, b: 1000 }, 1);
}
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$($(1) ? (a = b = $(2)) : $(200));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  b = $(2);
  let tmpNestedComplexRhs = b;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a, b);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a, b);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  $( b );
  $( b, b );
}
else {
  const c = $( 200 );
  $( c );
  const d = {
    a: 999,
    b: 1000,
  };
  $( d, 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - 4: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
