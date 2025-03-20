# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = !$(100)) || $(100));
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:boolean*/ = !tmpUnaryArg;
if (tmpUnaryArg) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
} else {
  $(a);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const a = !tmpUnaryArg;
if (tmpUnaryArg) {
  $($(100));
  $(a);
} else {
  $(a);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = !a;
if (a) {
  const c = $( 100 );
  $( c );
  $( b );
}
else {
  $( b );
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
 - 4: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
