# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Let > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($(0)) || $($(2));
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const xyz /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (xyz) {
  $(xyz);
  $(a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_xyz /*:unknown*/ = $(tmpCalleeParam$1);
  $(tmpClusterSSA_xyz);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const xyz = $($(0));
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
const a = $( 0 );
const b = $( a );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( b );
  $( c );
}
else {
  const d = $( 2 );
  const e = $( d );
  $( e );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(0);
let xyz = $(tmpCalleeParam);
if (xyz) {
  $(xyz);
  $(a);
} else {
  let tmpCalleeParam$1 = $(2);
  xyz = $(tmpCalleeParam$1);
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
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
