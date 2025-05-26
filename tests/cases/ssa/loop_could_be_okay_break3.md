# Preval test case

# loop_could_be_okay_break3.md

> Ssa > Loop could be okay break3
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
  let tmpLoopRetValue = undefined;
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
f();
`````


## Settled


`````js filename=intro
$(1);
const tmpClusterSSA_x /*:unknown*/ = $(2);
$(tmpClusterSSA_x);
if ($) {
} else {
  let tmpLoopRetCode /*:boolean*/ = true;
  while ($LOOP_UNROLL_10) {
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
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
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
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a );
if ($) {

}
else {
  let b = true;
  while ($LOOP_UNROLL_10) {
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
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
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
f();
`````


## Todos triggered


- (todo) Support this node type in isFree: LabeledStatement


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
