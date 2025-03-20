# Preval test case

# if-tail-hoisting.md

> Tofix > if-tail-hoisting

Two things to fix here:
- The assignments to x could be replaced by a call to $(x, 'final') and inlined
- The assignments are first assigned to a let but that seems redundant, are we forcing that? should we?
Though in this test, once we do one we can't do the other (--> `$($(2))`)

## Input

`````js filename=intro
let x = undefined;
const test = $(1);
if (test) {
  const a = $(2);
  x = a;
} else {
  const test2 = $(3);
  if (test2) {
    const b = $(4);
    x = b;
  } else {
    const c = $(5);
    x = c;
  }
}
$(x, "final");
`````


## Settled


`````js filename=intro
const test /*:unknown*/ = $(1);
if (test) {
  const a /*:unknown*/ = $(2);
  $(a, `final`);
} else {
  const test2 /*:unknown*/ = $(3);
  if (test2) {
    const b /*:unknown*/ = $(4);
    $(b, `final`);
  } else {
    const c /*:unknown*/ = $(5);
    $(c, `final`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $($(2), `final`);
} else {
  if ($(3)) {
    $($(4), `final`);
  } else {
    $($(5), `final`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  $( b, "final" );
}
else {
  const c = $( 3 );
  if (c) {
    const d = $( 4 );
    $( d, "final" );
  }
  else {
    const e = $( 5 );
    $( e, "final" );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
