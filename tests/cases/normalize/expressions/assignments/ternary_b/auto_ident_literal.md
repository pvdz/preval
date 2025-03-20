# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(1) ? (a = "foo") : $(200));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(`foo`);
  $(`foo`);
} else {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`foo`);
  $(`foo`);
} else {
  $($(200));
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "foo" );
  $( "foo" );
}
else {
  const b = $( 200 );
  $( b );
  const c = {
    a: 999,
    b: 1000,
  };
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'foo'
 - 3: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
