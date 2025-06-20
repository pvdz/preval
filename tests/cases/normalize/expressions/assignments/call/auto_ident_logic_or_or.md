# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Call > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  $(a);
  $(a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$3);
  if (tmpClusterSSA_a) {
    $(tmpClusterSSA_a);
    $(tmpClusterSSA_a);
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$5);
    $(tmpClusterSSA_a$1);
    $(tmpClusterSSA_a$1);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(0));
if (a) {
  $(a);
  $(a);
} else {
  const tmpClusterSSA_a = $($(1));
  if (tmpClusterSSA_a) {
    $(tmpClusterSSA_a);
    $(tmpClusterSSA_a);
  } else {
    const tmpClusterSSA_a$1 = $($(2));
    $(tmpClusterSSA_a$1);
    $(tmpClusterSSA_a$1);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( b );
  $( b );
}
else {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    $( d );
    $( d );
  }
  else {
    const e = $( 2 );
    const f = $( e );
    $( f );
    $( f );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = $(0);
a = $(tmpCalleeParam$1);
if (a) {
} else {
  let tmpCalleeParam$3 = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
  } else {
    let tmpCalleeParam$5 = $(2);
    a = $(tmpCalleeParam$5);
  }
}
let tmpCalleeParam = a;
$(a);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
