# Preval test case

# nested_while_try__nested_while.md

> If test aliased > Nested while try  nested while
>
> Test: alias with nested while

## Input

`````js filename=intro
let a = !c;
if (c) {
  while (c) {
    $(a);
  }
}

// Expected:
// let a = !c;
// if (c) {
//   while (c) {
//     $(false);
//   }
// }
`````


## Settled


`````js filename=intro
if (c) {
  c;
  while ($LOOP_UNROLL_10) {
    $(false);
    if (c) {
      c;
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
  c;
  while (true) {
    $(false);
    if (c) {
      c;
    } else {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (c) {
  c;
  while ($LOOP_UNROLL_10) {
    $( false );
    if (c) {
      c;
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
