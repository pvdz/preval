# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident logic and complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = $($(1)) && 2) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
    $(2);
    $(2);
  } else {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  const tmpNestedComplexRhs = $($(1));
  if (tmpNestedComplexRhs) {
    $(2);
    $(2);
  } else {
    $(tmpNestedComplexRhs);
    $(tmpNestedComplexRhs);
  }
} else {
  $($(200));
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 1 );
  const c = $( b );
  if (c) {
    $( 2 );
    $( 2 );
  }
  else {
    $( c );
    $( c );
  }
}
else {
  const d = $( 200 );
  $( d );
  const e = {
    a: 999,
    b: 1000,
  };
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  let tmpCalleeParam$1 = $(1);
  let tmpNestedComplexRhs = $(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
    tmpNestedComplexRhs = 2;
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
