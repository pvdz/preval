# Preval test case

# nested_if__nested_if.md

> If test aliased > Nested if  nested if
>
> Test: alias with nested if

## Input

`````js filename=intro
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
if (c) {
  c;
  $(false);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (c) {
  c;
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (c) {
  c;
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = !c;
if (c) {
  $(a);
} else {
}
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
