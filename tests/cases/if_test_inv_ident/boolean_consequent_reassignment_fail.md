# Preval test case

# boolean_consequent_reassignment_fail.md

> If test inv ident > Boolean consequent reassignment fail
>
> Alias `a = Boolean(c)` is reassigned before use in `if(c)`.

## Input

`````js filename=intro
// Transformation should NOT occur.
let c = $(true);
let a = Boolean(c);
a = false; // Reassignment
if (c) {
  $(a); // Expected: $(a) or equivalent $(false) from reassignment
}

// Expected:
// let c = $(true);
// let a = Boolean(c);
// a = false;
// if (c) {
//   $(a);
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
if (c) {
  $(false);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(true);
let a = $boolean_constructor(c);
a = false;
if (c) {
  $(a);
} else {
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
