# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Let > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = $($(1)) && $($(1)) && $($(2)));
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_a$1);
    $(tmpClusterSSA_a$1);
  } else {
    $(tmpClusterSSA_a);
    $(tmpClusterSSA_a);
  }
} else {
  $(a);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
if (a) {
  const tmpClusterSSA_a = $($(1));
  if (tmpClusterSSA_a) {
    const tmpClusterSSA_a$1 = $($(2));
    $(tmpClusterSSA_a$1);
    $(tmpClusterSSA_a$1);
  } else {
    $(tmpClusterSSA_a);
    $(tmpClusterSSA_a);
  }
} else {
  $(a);
  $(a);
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
  if (d) {
    const e = $( 2 );
    const f = $( e );
    $( f );
    $( f );
  }
  else {
    $( d );
    $( d );
  }
}
else {
  $( b );
  $( b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
