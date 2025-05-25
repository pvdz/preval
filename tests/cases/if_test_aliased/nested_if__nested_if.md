# Preval test case

# nested_if__nested_if.md

> If test aliased > Nested if  nested if
>
> Test: alias with nested if

## Input

`````js filename=intro
const c = $(true);
let a = !c;
if (c) {
  if (c) {
    $(a);
  }
}

// Expected:
// let a = !c;
// if (c) {
//   if (c) {
//     $(false);
//   }
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
const c = $(true);
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
