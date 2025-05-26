# Preval test case

# else_with_consequent_use.md

> If test inv ident > Else with consequent use
>
> Alias `a = !c` is used in both consequent and alternate branches.

## Input

`````js filename=intro
// `a` becomes `false` in consequent, `true` in alternate.
let c = $(true); // Will be flipped by test runner for full coverage
let a = !c;
if (c) {
  $(a); // Expected: $(false)
} else {
  $(a); // Expected: $(true)
}

// Expected (if c is initially true):
// let c = $(true);
// let a = !c;
// if (c) {
//   $(false);
// } else {
//   $(true); // This path won't be hit if c is true
// }

// Expected (if c is initially false):
// let c = $(false);
// let a = !c;
// if (c) {
//   $(false); // This path won't be hit if c is false
// } else {
//   $(true);
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
const tmpBool /*:boolean*/ = !c;
$(tmpBool);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const c = $(true);
$(!c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = !a;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(true);
let a = !c;
if (c) {
  $(a);
} else {
  $(a);
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
