# Preval test case

# else_alias_reassignment_fail.md

> If test aliased > Else alias reassignment fail
>
> Alias `a = !c` is reassigned before its use in the `else` block.

## Input

`````js filename=intro
// Transformation should NOT occur for the original alias rule.
let c = $(false);
let a = !c;
if (c) {
  // ...
} else {
  a = $(true); // Reassignment
  $(a); // Expected: $(a) or equivalent $(true) from reassignment, not from rule
}
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(false);
if (c) {
} else {
  const a /*:unknown*/ = $(true);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(false)) {
  $($(true));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {

}
else {
  const b = $( true );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(false);
let a = !c;
if (c) {
} else {
  a = $(true);
  $(a);
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
