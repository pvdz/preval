# Preval test case

# loop_could_be_okay_break2.md

> Ssa > Loop could be okay break2
>
> Example of technical case where SSA is possible

- there is a write before any read in the loop
- there is no further read

The conditional break introduces branching which prevents any SSA in the first place.

## Input

`````js filename=intro
let f = function () {
  let x = $(1);
  let tmpLoopRetCode = true;
  let tmpLoopBody = function () {
    debugger;
    x = $(2);
    $(x);
    if ($) {
      tmpLoopRetCode = false;
      return undefined;
    } else {
      return undefined;
    }
  };
  while (tmpLoopRetCode) {
    tmpLoopBody();
  }
};
if ($) {
  f();
} else {
}
`````


## Settled


`````js filename=intro
if ($) {
  $(1);
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
  if ($) {
  } else {
    let tmpLoopRetCode /*:boolean*/ = true;
    while ($LOOP_UNROLLS_LEFT_10) {
      const tmpClusterSSA_x$1 /*:unknown*/ = $(2);
      $(tmpClusterSSA_x$1);
      if ($) {
        tmpLoopRetCode = false;
      } else {
      }
      if (tmpLoopRetCode) {
      } else {
        break;
      }
    }
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(1);
  $($(2));
  if (!$) {
    let tmpLoopRetCode = true;
    while (true) {
      $($(2));
      if ($) {
        tmpLoopRetCode = false;
      }
      if (!tmpLoopRetCode) {
        break;
      }
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 1 );
  const a = $( 2 );
  $( a );
  if ($) {

  }
  else {
    let b = true;
    while ($LOOP_UNROLLS_LEFT_10) {
      const c = $( 2 );
      $( c );
      if ($) {
        b = false;
      }
      if (b) {

      }
      else {
        break;
      }
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  let tmpLoopRetCode = true;
  let tmpLoopBody = function () {
    debugger;
    x = $(2);
    $(x);
    if ($) {
      tmpLoopRetCode = false;
      return undefined;
    } else {
      return undefined;
    }
  };
  while (true) {
    if (tmpLoopRetCode) {
      tmpLoopBody();
    } else {
      break;
    }
  }
  return undefined;
};
if ($) {
  f();
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
