# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Logic and right > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) && (a = arguments));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const tmpClusterSSA_a /*:unknown*/ = arguments;
  $(arguments);
  $(tmpClusterSSA_a);
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpClusterSSA_a = arguments;
  $(arguments);
  $(tmpClusterSSA_a);
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = arguments;
  $( arguments );
  $( b );
}
else {
  $( a );
  const c = {
    a: 999,
    b: 1000,
  };
  $( c );
}
`````


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '<Global Arguments>'
 - 3: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
