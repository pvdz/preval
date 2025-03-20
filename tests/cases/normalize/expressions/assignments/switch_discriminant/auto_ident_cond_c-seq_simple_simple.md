# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = (10, 20, $(30)) ? $(2) : $($(100)))) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  const tmpClusterSSA_a /*:unknown*/ = $(2);
  $(100);
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam);
  $(100);
  $(tmpClusterSSA_a$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(30)) {
  const tmpClusterSSA_a = $(2);
  $(100);
  $(tmpClusterSSA_a);
} else {
  const tmpClusterSSA_a$1 = $($(100));
  $(100);
  $(tmpClusterSSA_a$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
if (a) {
  const b = $( 2 );
  $( 100 );
  $( b );
}
else {
  const c = $( 100 );
  const d = $( c );
  $( 100 );
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: 100
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
