# Preval test case

# else_if_test_is_literal_false.md

> If test aliased > Else if test is literal false
>
> `if(false)`, so only `else` branch is live. Alias `a = !c` is in `else`.

## Input

`````js filename=intro
// This should NOT transform `a` based on `if(false)` because `a` is `!c`,
// and `ifTestName` (if any from `false`) would not match `c`.
let c = $(true);
let a = !c;
if (false) {
  // ...
} else {
  $(a); // Expected: $(a)
}

// Expected: No transformation of `a` by this rule specific to `if(false)`.
// let c = $(true);
// let a = !c;
// if (false) {
//   // ...
// } else {
//   $(a);
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
const a /*:boolean*/ /*banged*/ = !c;
$(a);
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
$(a);
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
