# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident cond complex simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $(1) ? 2 : $($(100));
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpIfTest$1 /*:unknown*/ = $(1);
if (tmpIfTest$1) {
  $(2);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(2);
} else {
  $($($(100)));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
}
else {
  const b = $( 100 );
  const c = $( b );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
