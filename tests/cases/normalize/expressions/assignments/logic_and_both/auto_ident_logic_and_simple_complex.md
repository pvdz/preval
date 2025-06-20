# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident logic and simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 && $($(1))) && (a = 1 && $($(1))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
if (tmpClusterSSA_a$1) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$3);
  $(tmpClusterSSA_tmpNestedComplexRhs);
  $(tmpClusterSSA_tmpNestedComplexRhs);
} else {
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a$1 = $($(1));
if (tmpClusterSSA_a$1) {
  const tmpClusterSSA_tmpNestedComplexRhs = $($(1));
  $(tmpClusterSSA_tmpNestedComplexRhs);
  $(tmpClusterSSA_tmpNestedComplexRhs);
} else {
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  $( d );
  $( d );
}
else {
  $( b );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1;
if (a) {
  let tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = 1;
  if (tmpNestedComplexRhs) {
    let tmpCalleeParam$3 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$3);
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
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
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
