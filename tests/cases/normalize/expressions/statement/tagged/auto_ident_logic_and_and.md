# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Tagged > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$($(1)) && $($(1)) && $($(2))} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpCalleeParam$1) {
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$5);
  if (tmpClusterSSA_tmpCalleeParam$1) {
    const tmpCalleeParam$7 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpCalleeParam$2 /*:unknown*/ = $(tmpCalleeParam$7);
    $(tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$2);
    $(a);
  } else {
    $(tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$1);
    $(a);
  }
} else {
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $($(1));
const tmpCalleeParam = [`before `, ` after`];
const a = { a: 999, b: 1000 };
if (tmpCalleeParam$1) {
  const tmpClusterSSA_tmpCalleeParam$1 = $($(1));
  if (tmpClusterSSA_tmpCalleeParam$1) {
    $(tmpCalleeParam, $($(2)));
    $(a);
  } else {
    $(tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$1);
    $(a);
  }
} else {
  $(tmpCalleeParam, tmpCalleeParam$1);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
const c = [ "before ", " after" ];
const d = {
  a: 999,
  b: 1000,
};
if (b) {
  const e = $( 1 );
  const f = $( e );
  if (f) {
    const g = $( 2 );
    const h = $( g );
    $( c, h );
    $( d );
  }
  else {
    $( c, f );
    $( d );
  }
}
else {
  $( c, b );
  $( d );
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
 - 7: ['before ', ' after'], 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
