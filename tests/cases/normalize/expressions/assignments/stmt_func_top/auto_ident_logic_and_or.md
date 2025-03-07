# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = ($($(1)) && $($(1))) || $($(2));
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$1);
} else {
}
if (a) {
  $(a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$3);
  $(tmpClusterSSA_a);
}
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
if (a) {
  a = $($(1));
}
if (a) {
  $(a);
} else {
  $($($(2)));
}
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  a = ($($(1)) && $($(1))) || $($(2));
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  if (a) {
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
  } else {
  }
  if (a) {
  } else {
    const tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
  }
  $(a);
  return undefined;
};
const tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {
  $( b );
}
else {
  const d = $( 2 );
  const e = $( d );
  $( e );
}
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
