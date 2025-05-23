# Preval test case

# write-read-all-scopes-branched.md

> Let hoisting > Multi-scope-all-write > Write-read-all-scopes-branched
>
> What if the first ref of a scope has a write but not all reads in that scope can reach it?

## Input

`````js filename=intro
let x = 1;
const f = function() {
  if ($) {
    x = 2;
    if ($) {
      $(x);
    }
  }
  $(x);
}
if ($) {
  f();
  $(x);
}
`````


## Settled


`````js filename=intro
if ($) {
  $(2);
  $(2);
  if ($) {
    $(2);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(2);
  $(2);
  if ($) {
    $(2);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 2 );
  $( 2 );
  if ($) {
    $( 2 );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
const f = function () {
  debugger;
  if ($) {
    x = 2;
    if ($) {
      $(x);
      $(x);
      return undefined;
    } else {
      $(x);
      return undefined;
    }
  } else {
    $(x);
    return undefined;
  }
};
if ($) {
  f();
  $(x);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
