# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident cond s-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
((10, 20, 30) ? (40, 50, $(60)) : $($(100))) &&
  ((10, 20, 30) ? (40, 50, $(60)) : $($(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpIfTest /*:unknown*/ = $(60);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
if (tmpClusterSSA_tmpIfTest) {
  $(60);
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpIfTest = $(60);
const a = { a: 999, b: 1000 };
if (tmpClusterSSA_tmpIfTest) {
  $(60);
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  $( 60 );
  $( b );
}
else {
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpIfTest$1 = 30;
if (tmpIfTest$1) {
  tmpIfTest = $(60);
} else {
  let tmpCalleeParam = $(100);
  tmpIfTest = $(tmpCalleeParam);
}
if (tmpIfTest) {
  const tmpIfTest$3 = 30;
  if (tmpIfTest$3) {
    $(60);
    $(a);
  } else {
    let tmpCalleeParam$1 = $(100);
    $(tmpCalleeParam$1);
    $(a);
  }
} else {
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 60
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
