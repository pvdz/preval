# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Call > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(($($(1)) && $($(1))) || $($(2)));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
if (tmpCalleeParam) {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  tmpCalleeParam = $(tmpCalleeParam$3);
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpCalleeParam$5 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$5);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = $($(1));
if (tmpCalleeParam) {
  tmpCalleeParam = $($(1));
}
const a = { a: 999, b: 1000 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  $($($(2)));
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(($($(1)) && $($(1))) || $($(2)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(1);
let tmpCalleeParam = $(tmpCalleeParam$1);
if (tmpCalleeParam) {
  const tmpCalleeParam$3 = $(1);
  tmpCalleeParam = $(tmpCalleeParam$3);
} else {
}
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  const tmpCalleeParam$5 = $(2);
  tmpCalleeParam = $(tmpCalleeParam$5);
  $(tmpCalleeParam);
  $(a);
}
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
const d = {
  a: 999,
  b: 1000,
};
if (b) {
  $( b );
  $( d );
}
else {
  const e = $( 2 );
  const f = $( e );
  $( f );
  $( d );
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
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
