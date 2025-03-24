# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Logic and left > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = arguments) && $(100));
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = arguments;
if (arguments) {
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
const a = arguments;
if (arguments) {
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
const a = arguments;
if (arguments) {
  const b = $( 100 );
  $( b );
  $( a );
}
else {
  $( a );
  $( a );
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
