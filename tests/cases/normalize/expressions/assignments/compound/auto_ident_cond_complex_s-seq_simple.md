# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident cond complex s-seq simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $(1) ? (40, 50, 60) : $($(100))));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpClusterSSA_a$1 /*:number*/ = a * 60;
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(100);
  const tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpClusterSSA_a$3 /*:number*/ = a * tmpBinBothRhs;
  $(tmpClusterSSA_a$3);
  $(tmpClusterSSA_a$3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpClusterSSA_a$1 = a * 60;
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
} else {
  const tmpClusterSSA_a$3 = a * $($(100));
  $(tmpClusterSSA_a$3);
  $(tmpClusterSSA_a$3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = {
  a: 999,
  b: 1000,
};
if (a) {
  const c = b * 60;
  $( c );
  $( c );
}
else {
  const d = $( 100 );
  const e = $( d );
  const f = b * e;
  $( f );
  $( f );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
