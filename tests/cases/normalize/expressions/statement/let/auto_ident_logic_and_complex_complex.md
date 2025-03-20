# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Let > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($(1)) && $($(2));
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const xyz /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
if (xyz) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_xyz /*:unknown*/ = $(tmpCalleeParam$1);
  $(tmpClusterSSA_xyz);
  $(a);
} else {
  $(xyz);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const xyz = $($(1));
const a = { a: 999, b: 1000 };
if (xyz) {
  $($($(2)));
  $(a);
} else {
  $(xyz);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  const d = $( 2 );
  const e = $( d );
  $( e );
  $( c );
}
else {
  $( b );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
