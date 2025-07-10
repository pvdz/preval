# Preval test case

# label_bug.md

> Arr mutation > Label bug
>
> This minimal test case would break somehow

The problem was that arr_mutation was doing a noop check between read and write
and only looked at func scope, rather than block scope. But since the read
could be in a higher block than the write, it may not be reachable when walking
from the write. And that's what happened here.
The test case itself is a dud. It just was able to proc that particular code path.

## Input

`````js filename=intro
let x = undefined;
label: {
  if (a) {
    if (b) {
      break label;
    } else {

    }
  } else {

  }
  x = [];
}
[...x];
`````


## Settled


`````js filename=intro
let x /*:unknown*/ = undefined;
label: {
  if (a) {
    if (b) {
      break label;
    } else {
    }
  } else {
  }
  x = [];
}
[...x];
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = undefined;
label: {
  if (a) {
    if (b) {
      break label;
    }
  }
  x = [];
}
[...x];
`````


## PST Settled
With rename=true

`````js filename=intro
let c = undefined;
label: {
  if (a) {
    if (b) {
      break label;
    }
  }
  c = [];
}
[ ...c ];
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
label: {
  if (a) {
    if (b) {
      break label;
    } else {
    }
  } else {
  }
  x = [];
}
[...x];
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

a, b


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
