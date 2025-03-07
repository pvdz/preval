# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Logic and left > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ($($(1)) && $($(1))) || $($(2))) && $(100));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
} else {
}
let tmpCalleeParam /*:unknown*/ = undefined;
if (a) {
  tmpCalleeParam = a;
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$5);
  tmpCalleeParam = a;
}
if (a) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
if (a) {
  a = $($(1));
}
let tmpCalleeParam = undefined;
if (a) {
  tmpCalleeParam = a;
} else {
  a = $($(2));
  tmpCalleeParam = a;
}
if (a) {
  $($(100));
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ($($(1)) && $($(1))) || $($(2))) && $(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(1);
a = $(tmpCalleeParam$1);
if (a) {
  const tmpCalleeParam$3 = $(1);
  a = $(tmpCalleeParam$3);
} else {
}
if (a) {
} else {
  const tmpCalleeParam$5 = $(2);
  a = $(tmpCalleeParam$5);
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  tmpCalleeParam = $(100);
} else {
}
$(tmpCalleeParam);
$(a);
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
let d = undefined;
if (b) {
  d = b;
}
else {
  const e = $( 2 );
  b = $( e );
  d = b;
}
if (b) {
  const f = $( 100 );
  $( f );
}
else {
  $( d );
}
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: 100
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
