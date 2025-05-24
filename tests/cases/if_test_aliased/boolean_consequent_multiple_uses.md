# Preval test case

# boolean_consequent_multiple_uses.md

> If test aliased > Boolean consequent multiple uses
>
> ool multi use in consequent

## Input

`````js filename=intro
let d = $(true);
let b = Boolean(d);
if (d) {
  $(b); // Expected: $(true)
  let x = 10;
  $(b); // Expected: $(true)
}

// Expected:
// let d = $(true);
// let b = Boolean(d);
// if (d) {
//   $(true);
//   let x = 10;
//   $(true);
// }
`````


## Settled


`````js filename=intro
const d /*:unknown*/ = $(true);
if (d) {
  $(true);
  $(true);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(true);
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( true );
  $( true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let d = $(true);
let b = $boolean_constructor(d);
if (d) {
  $(b);
  let x = 10;
  $(b);
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
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
