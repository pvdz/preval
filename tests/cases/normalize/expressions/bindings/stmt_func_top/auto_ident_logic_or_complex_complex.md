# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic or complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = $($(0)) || $($(2));
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  $(a);
  $(undefined);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  $(tmpClusterSSA_a);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(0));
if (a) {
  $(a);
  $(undefined);
} else {
  $($($(2)));
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( b );
  $( undefined );
}
else {
  const c = $( 2 );
  const d = $( c );
  $( d );
  $( undefined );
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
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
