# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) ? (40, 50, 60) : $($(100))) || $(100));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = 60;
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$1);
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = 60;
if (!$(1)) {
  a = $($(100));
}
if (a) {
  $(a);
  $(a);
} else {
  $($(100));
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 60;
const b = $( 1 );
if (b) {

}
else {
  const c = $( 100 );
  a = $( c );
}
if (a) {
  $( a );
  $( a );
}
else {
  const d = $( 100 );
  $( d );
  $( a );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
