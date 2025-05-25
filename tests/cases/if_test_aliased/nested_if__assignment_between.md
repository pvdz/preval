# Preval test case

# nested_if__assignment_between.md

> If test aliased > Nested if  assignment between
>
> Test: alias with assignment in between (should not fire)

## Input

`````js filename=intro
const c = $(true);
let a = !c;
a = 1;
if (c) {
  $(a);
}

// Expected:
// let a = !c;
// a = 1;
// if (c) {
//   $(a);
// }
`````


## Settled


`````js filename=intro
const c /*:unknown*/ = $(true);
if (c) {
  $(1);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( 1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const c = $(true);
let a = !c;
a = 1;
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
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
