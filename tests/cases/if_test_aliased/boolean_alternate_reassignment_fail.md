# Preval test case

# boolean_alternate_reassignment_fail.md

> If test aliased > Boolean alternate reassignment fail
>
> ool alt assignment fail

## Input

`````js filename=intro
let c = $(false);
let a = Boolean(c);
if (c) {
  // ...
} else {
  a = true; // Reassignment
  $(a); // Expected: $(a) or equivalent $(true) from reassignment
}
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(false);
if (c) {
} else {
  $(true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(false)) {
  $(true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {

}
else {
  $( true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let c = $(false);
let a = $boolean_constructor(c);
if (c) {
} else {
  a = true;
  $(a);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
