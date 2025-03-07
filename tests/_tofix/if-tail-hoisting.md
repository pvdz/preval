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

## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
if ($(1)) {
  x = $(2);
} else {
  if ($(3)) {
    x = $(4);
  } else {
    x = $(5);
  }
}
$(x, `final`);
`````

## Pre Normal


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
$(x, `final`);
`````

## Normalized


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
$(x, `final`);
`````

## Settled


`````js filename=intro
let x /*:unknown*/ = undefined;
const test /*:unknown*/ = $(1);
if (test) {
  const a /*:unknown*/ = $(2);
  x = a;
} else {
  const test2 /*:unknown*/ = $(3);
  if (test2) {
    const b /*:unknown*/ = $(4);
    x = b;
  } else {
    const c /*:unknown*/ = $(5);
    x = c;
  }
}
$(x, `final`);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  const c = $( 2 );
  a = c;
}
else {
  const d = $( 3 );
  if (d) {
    const e = $( 4 );
    a = e;
  }
  else {
    const f = $( 5 );
    a = f;
  }
}
$( a, "final" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
