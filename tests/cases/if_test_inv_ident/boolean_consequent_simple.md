# Preval test case

# boolean_consequent_simple.md

> If test inv ident > Boolean consequent simple
>
> An alias `a = Boolean(c)` is used in the `if (c)` (consequent) branch.

## Input

`````js filename=intro
// `a` should become `true`.
let c = $(true);
let a = Boolean(c);
if (c) {
  $(a); // Expected: $(true)
}

// Expected:
// let c = $(true);
// let a = Boolean(c);
// if (c) {
//   $(true);
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
if (c) {
  $(true);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(true);
let a = $boolean_constructor(c);
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
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
