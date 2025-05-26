# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Arr element > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(
  (a = $($(0)) || ($($(1)) && $($(2)))) + (a = $($(0)) || ($($(1)) && $($(2))))
);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$5);
  } else {
  }
}
const tmpCalleeParam$7 /*:unknown*/ = $(0);
let tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$7);
if (tmpClusterSSA_a) {
} else {
  const tmpCalleeParam$9 /*:unknown*/ = $(1);
  tmpClusterSSA_a = $(tmpCalleeParam$9);
  if (tmpClusterSSA_a) {
    const tmpCalleeParam$11 /*:unknown*/ = $(2);
    tmpClusterSSA_a = $(tmpCalleeParam$11);
  } else {
  }
}
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
if (!a) {
  a = $($(1));
  if (a) {
    a = $($(2));
  }
}
let tmpClusterSSA_a = $($(0));
if (!tmpClusterSSA_a) {
  tmpClusterSSA_a = $($(1));
  if (tmpClusterSSA_a) {
    tmpClusterSSA_a = $($(2));
  }
}
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
const e = $( 0 );
let f = $( e );
if (f) {

}
else {
  const g = $( 1 );
  f = $( g );
  if (f) {
    const h = $( 2 );
    f = $( h );
  }
}
const i = b + f;
$( i );
$( f );
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
    let tmpCalleeParam$5 = $(2);
    a = $(tmpCalleeParam$5);
  } else {
  }
}
const tmpBinBothLhs = a;
let tmpCalleeParam$7 = $(0);
a = $(tmpCalleeParam$7);
if (a) {
} else {
  let tmpCalleeParam$9 = $(1);
  a = $(tmpCalleeParam$9);
  if (a) {
    let tmpCalleeParam$11 = $(2);
    a = $(tmpCalleeParam$11);
  } else {
  }
}
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
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
 - 5: 2
 - 6: 2
 - 7: 0
 - 8: 0
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 2
 - 13: 4
 - 14: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
