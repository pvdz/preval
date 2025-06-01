# Preval test case

# assigned_to_non_identifier.md

> Ternary alias > Ai silly contrived > Assigned to non identifier
>
> b assigned to a literal: should NOT replace

## Input

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {} else { b = 42; }
$(b);
// Expect: No change, b is not a pure alias
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
if (x) {
  $(undefined);
} else {
  $(42);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(undefined);
} else {
  $(42);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( undefined );
}
else {
  $( 42 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let a = undefined;
let b = undefined;
if (x) {
  $(b);
} else {
  b = 42;
  $(b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
