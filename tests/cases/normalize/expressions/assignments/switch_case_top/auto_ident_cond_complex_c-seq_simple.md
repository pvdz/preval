# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident cond complex c-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = $(1) ? (40, 50, $(60)) : $($(100));
}
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(1);
  if (tmpIfTest$1) {
    const tmpClusterSSA_a /*:unknown*/ = $(60);
    $(tmpClusterSSA_a);
  } else {
    const tmpCalleeParam /*:unknown*/ = $(100);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam);
    $(tmpClusterSSA_a$1);
  }
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  if ($(1)) {
    $($(60));
  } else {
    $($($(100)));
  }
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = $( 1 );
  if (d) {
    const e = $( 60 );
    $( e );
  }
  else {
    const f = $( 100 );
    const g = $( f );
    $( g );
  }
}
else {
  const h = {
    a: 999,
    b: 1000,
  };
  $( h );
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
 - 4: 60
 - 5: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
