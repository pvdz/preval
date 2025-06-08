# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Let > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = ($($(1)) && $($(1))) || $($(2));
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let xyz /*:unknown*/ = $(tmpCalleeParam);
if (xyz) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  xyz = $(tmpCalleeParam$1);
} else {
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (xyz) {
  $(xyz);
  $(a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_xyz /*:unknown*/ = $(tmpCalleeParam$3);
  $(tmpClusterSSA_xyz);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let xyz = $($(1));
if (xyz) {
  xyz = $($(1));
}
const a = { a: 999, b: 1000 };
if (xyz) {
  $(xyz);
  $(a);
} else {
  $($($(2)));
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(1);
let xyz = $(tmpCalleeParam);
if (xyz) {
  let tmpCalleeParam$1 = $(1);
  xyz = $(tmpCalleeParam$1);
} else {
}
if (xyz) {
  $(xyz);
  $(a);
} else {
  let tmpCalleeParam$3 = $(2);
  xyz = $(tmpCalleeParam$3);
  $(xyz);
  $(a);
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
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
