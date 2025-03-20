# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident logic or complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(0)) || $($(2));
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
  $(tmpClusterSSA_a$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $($(0));
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
} else {
  $($($(2)));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( b );
}
else {
  const c = $( 2 );
  const d = $( c );
  $( d );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
