# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $(1) ? (40, 50, $(60)) : $($(100))) && $(100));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpIfTest /*:unknown*/ = $(1);
let tmpCalleeParam /*:unknown*/ = undefined;
if (tmpIfTest) {
  a = $(60);
  tmpCalleeParam = a;
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  a = $(tmpCalleeParam$1);
  tmpCalleeParam = a;
}
if (a) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const tmpIfTest = $(1);
let tmpCalleeParam = undefined;
if (tmpIfTest) {
  a = $(60);
  tmpCalleeParam = a;
} else {
  a = $($(100));
  tmpCalleeParam = a;
}
if (a) {
  $($(100));
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
let c = undefined;
if (b) {
  a = $( 60 );
  c = a;
}
else {
  const d = $( 100 );
  a = $( d );
  c = a;
}
if (a) {
  const e = $( 100 );
  $( e );
  $( a );
}
else {
  $( c );
  $( a );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 100
 - 4: 100
 - 5: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
