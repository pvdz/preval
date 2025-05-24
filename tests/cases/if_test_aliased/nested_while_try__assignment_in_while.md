# Preval test case

# nested_while_try__assignment_in_while.md

> If test aliased > Nested while try  assignment in while
>
> Test: alias with assignment in while (should not fire)

## Input

`````js filename=intro
let a = !c;
if (c) {
  while (c) {
    a = 1;
    $(a);
  }
}

// Expected:
// let a = !c;
// if (c) {
//   while (c) {
//     a = 1;
//     $(a);
//   }
// }
`````


## Settled


`````js filename=intro
if (c) {
  while ($LOOP_UNROLL_10) {
    $(1);
    if (c) {
    } else {
      break;
    }
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (c) {
  while (true) {
    $(1);
    if (!c) {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    if (c) {

    }
    else {
      break;
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = !c;
if (c) {
  while (true) {
    if (c) {
      a = 1;
      $(a);
    } else {
      break;
    }
  }
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
