# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Let > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($(1)) && $($(1)) && $($(2));
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const xyz /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
if (xyz) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_xyz /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_xyz) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_xyz$1 /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_xyz$1);
    $(a);
  } else {
    $(tmpClusterSSA_xyz);
    $(a);
  }
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
  const tmpClusterSSA_xyz = $($(1));
  if (tmpClusterSSA_xyz) {
    $($($(2)));
    $(a);
  } else {
    $(tmpClusterSSA_xyz);
    $(a);
  }
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
  const d = $( 1 );
  const e = $( d );
  if (e) {
    const f = $( 2 );
    const g = $( f );
    $( g );
    $( c );
  }
  else {
    $( e );
    $( c );
  }
}
else {
  $( b );
  $( c );
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
  if (xyz) {
    let tmpCalleeParam$3 = $(2);
    xyz = $(tmpCalleeParam$3);
    $(xyz);
    $(a);
  } else {
    $(xyz);
    $(a);
  }
} else {
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
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
