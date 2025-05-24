# Preval test case

# boolean_consequent_nested_if.md

> If test aliased > Boolean consequent nested if
>
> Alias `a = Boolean(c)` used in `if(c)`,

## Input

`````js filename=intro
// inside the consequent of a nested `if(d)`.
// `a` should become `true`.
let c = $(true);
let d = $(true);
let a = Boolean(c);
if (c) {
  if (d) {
    $(a); // Expected: $(true)
  }
}

// Expected:
// let c = $(true);
// let d = $(true);
// let a = Boolean(c);
// if (c) {
//   if (d) {
//     $(true);
//   }
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
const d /*:unknown*/ = $(true);
if (c) {
  if (d) {
    $(true);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const c = $(true);
const d = $(true);
if (c) {
  if (d) {
    $(true);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = $( true );
if (a) {
  if (b) {
    $( true );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(true);
let d = $(true);
let a = $boolean_constructor(c);
if (c) {
  if (d) {
    $(a);
  } else {
  }
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
