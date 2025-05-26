# Preval test case

# boolean_call_no_args_fail.md

> If test inv ident > Boolean call no args fail
>
> Alias `a = Boolean()`. This is valid JS (evals to false).

## Input

`````js filename=intro
// However, our rule requires `Boolean(ifTestName)`.
// Transformation should NOT occur.
let c = $(true);
let a = Boolean();
if (c) {
  $(a); // Expected: $(a)
}

// Expected:
// let c = $(true);
// let a = Boolean();
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
let a = false;
if (c) {
  $(a);
} else {
}
`````


## Todos triggered


None


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
