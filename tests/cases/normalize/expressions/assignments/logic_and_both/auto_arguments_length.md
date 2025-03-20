# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Logic and both > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = arguments) && (a = arguments));
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = arguments;
if (a) {
  const tmpClusterSSA_a /*:unknown*/ = arguments;
  $(arguments);
  $(tmpClusterSSA_a);
} else {
  $(a);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = arguments;
if (a) {
  const tmpClusterSSA_a = arguments;
  $(arguments);
  $(tmpClusterSSA_a);
} else {
  $(a);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = arguments;
if (a) {
  const b = arguments;
  $( arguments );
  $( b );
}
else {
  $( a );
  $( a );
}
`````


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - 1: '<Global Arguments>'
 - 2: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
