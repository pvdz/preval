# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident unary tilde complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ~$(100)) ? $(100) : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:number*/ = ~tmpUnaryArg;
if (a) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const a = ~tmpUnaryArg;
if (a) {
  $($(100));
  $(a);
} else {
  $($(200));
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = ~a;
if (b) {
  const c = $( 100 );
  $( c );
  $( b );
}
else {
  const d = $( 200 );
  $( d );
  $( b );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: -101
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
