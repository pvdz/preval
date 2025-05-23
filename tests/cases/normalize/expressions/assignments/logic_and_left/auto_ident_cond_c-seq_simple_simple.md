# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident cond c-seq simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = (10, 20, $(30)) ? $(2) : $($(100))) && $(100));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  a = $(2);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$1);
}
if (a) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
} else {
  $(a);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if ($(30)) {
  a = $(2);
} else {
  a = $($(100));
}
if (a) {
  $($(100));
  $(a);
} else {
  $(a);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 30 );
if (b) {
  a = $( 2 );
}
else {
  const c = $( 100 );
  a = $( c );
}
if (a) {
  const d = $( 100 );
  $( d );
  $( a );
}
else {
  $( a );
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: 100
 - 4: 100
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
