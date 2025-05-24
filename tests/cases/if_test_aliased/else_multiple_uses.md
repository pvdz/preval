# Preval test case

# else_multiple_uses.md

> If test aliased > Else multiple uses
>
> An alias `b = !d` is used multiple times in the `else` branch.

## Input

`````js filename=intro
// Both uses of `b` should become `true`.
let d = $(false);
let b = !d;
if (d) {
  $(d);
} else {
  $(b); // Expected: $(true)
  let x = 10;
  $(b); // Expected: $(true)
}

// Expected:
// let d = $(false);
// let b = !d;
// if (d) {
//   $(d);
// } else {
//   $(true);
//   let x = 10;
//   $(true);
// }
`````


## Settled


`````js filename=intro
const d /*:unknown*/ = $(false);
if (d) {
  $(d);
} else {
  $(true);
  $(true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const d = $(false);
if (d) {
  $(d);
} else {
  $(true);
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( a );
}
else {
  $( true );
  $( true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let d = $(false);
let b = !d;
if (d) {
  $(d);
} else {
  $(b);
  let x = 10;
  $(b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: true
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
