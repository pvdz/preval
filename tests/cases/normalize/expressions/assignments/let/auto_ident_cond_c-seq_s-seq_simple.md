# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Let > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100)));
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  $(60);
  $(60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(30)) {
  $(60);
  $(60);
} else {
  const tmpClusterSSA_a = $($(100));
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
if (a) {
  $( 60 );
  $( 60 );
}
else {
  const b = $( 100 );
  const c = $( b );
  $( c );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
