# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Let > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (10, 20, $(30)) ? $(2) : $($(100));
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpClusterSSA_xyz /*:unknown*/ = $(2);
  $(tmpClusterSSA_xyz);
  $(a);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_xyz$1 /*:unknown*/ = $(tmpCalleeParam);
  $(tmpClusterSSA_xyz$1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(30);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $($(2));
  $(a);
} else {
  $($($(100)));
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = $( 2 );
  $( c );
  $( b );
}
else {
  const d = $( 100 );
  const e = $( d );
  $( e );
  $( b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
