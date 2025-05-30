# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident cond complex simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $(1) ? 2 : $($(100)))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
  $(undefined);
  $(2);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const a /*:unknown*/ = $(tmpCalleeParam);
  $(undefined);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(undefined);
  $(2);
} else {
  const a = $($(100));
  $(undefined);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( undefined );
  $( 2 );
}
else {
  const b = $( 100 );
  const c = $( b );
  $( undefined );
  $( c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
