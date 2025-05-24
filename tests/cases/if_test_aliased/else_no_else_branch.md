# Preval test case

# else_no_else_branch.md

> If test aliased > Else no else branch
>
> Alias `a = !c` is declared, `if(c)` has no `else` branch.

## Input

`````js filename=intro
// No transformation should occur related to an `else` path.
let c = $(true);
let a = !c;
if (c) {
  $(a); // Expected: $(false)
}

// Expected:
// let c = $(true);
// let a = !c;
// if (c) {
//   $(false);
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
let a = !c;
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
