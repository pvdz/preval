# Preval test case

# nested_if__nested_else.md

> If test aliased > Nested if  nested else
>
> Test: alias with nested else

## Input

`````js filename=intro
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
c;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
c;
`````


## PST Settled
With rename=true

`````js filename=intro
c;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = !c;
c;
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

c


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
