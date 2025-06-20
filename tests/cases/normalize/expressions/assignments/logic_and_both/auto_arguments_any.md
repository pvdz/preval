# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Logic and both > Auto arguments any
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
if (arguments) {
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
if (arguments) {
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
if (arguments) {
  const b = arguments;
  $( arguments );
  $( b );
}
else {
  $( a );
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = arguments;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  a = arguments;
  tmpCalleeParam = arguments;
  $(arguments);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````


## Todos triggered


None


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
