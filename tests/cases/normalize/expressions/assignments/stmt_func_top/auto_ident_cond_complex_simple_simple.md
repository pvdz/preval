# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident cond complex simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  a = $(1) ? 2 : $($(100));
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(2);
  $(undefined);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  $(tmpClusterSSA_a);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(2);
  $(undefined);
} else {
  $($($(100)));
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
  $( undefined );
}
else {
  const b = $( 100 );
  const c = $( b );
  $( c );
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
