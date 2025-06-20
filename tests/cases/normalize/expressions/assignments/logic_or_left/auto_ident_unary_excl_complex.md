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
if (tmpUnaryArg) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(false);
} else {
  $(true);
  $(true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(100)) {
  $($(100));
  $(false);
} else {
  $(true);
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = $( 100 );
  $( b );
  $( false );
}
else {
  $( true );
  $( true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


None


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
