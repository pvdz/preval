# Preval test case

# nested_if__nested_else.md

> If test aliased > Nested if  nested else
>
> Test: alias with nested else

## Input

`````js filename=intro
const c = $(true);
let a = !c;
if (c) {
} else {
  if (c) {
    $(a);
  }
}

// Expected:
// let a = !c;
// if (c) {
// } else {
//   if (c) {
//     $(a);
//   }
// }
`````


## Settled


`````js filename=intro
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const c = $(true);
let a = !c;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
