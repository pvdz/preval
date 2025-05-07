# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Switch case test > Auto ident cond c-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = (10, 20, $(30)) ? (40, 50, 60) : $($(100))):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpIfTest$1 /*:unknown*/ = $(30);
if (tmpIfTest$1) {
  $(60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const a /*:unknown*/ = $(tmpCalleeParam);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
if ($(30)) {
  $(60);
} else {
  $($($(100)));
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 30 );
if (a) {
  $( 60 );
}
else {
  const b = $( 100 );
  const c = $( b );
  $( c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
