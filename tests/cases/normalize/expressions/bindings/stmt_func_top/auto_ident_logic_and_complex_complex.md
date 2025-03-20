# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic and complex complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let a = $($(1)) && $($(2));
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
  $(tmpClusterSSA_a);
  $(undefined);
} else {
  $(a);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
if (a) {
  $($($(2)));
  $(undefined);
} else {
  $(a);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 2 );
  const d = $( c );
  $( d );
  $( undefined );
}
else {
  $( b );
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
