# Preval test case

# loop_could_be_okay_break5.md

> Ssa > Loop could be okay break5

## Input

`````js filename=intro
let $tmpLoopUnrollCheck = true;
let tmpLoopRetCode = !$;
if (tmpLoopRetCode) {
  if ($) {
    tmpLoopRetCode = false;
  } else {
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpLoopRetCode) {
      if ($) {
        tmpLoopRetCode = false;
      } else {
      }
    } else {
      break;
    }
  }
} else {
}
`````


## Settled


`````js filename=intro
if ($) {
} else {
  let tmpLoopRetCode /*:boolean*/ = true;
  if ($) {
    tmpLoopRetCode = false;
  } else {
  }
  while ($LOOP_UNROLL_9) {
    if (tmpLoopRetCode) {
      if ($) {
        tmpLoopRetCode = false;
      } else {
      }
    } else {
      break;
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$) {
  let tmpLoopRetCode = true;
  if ($) {
    tmpLoopRetCode = false;
  }
  while (true) {
    if (tmpLoopRetCode) {
      if ($) {
        tmpLoopRetCode = false;
      }
    } else {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {

}
else {
  let a = true;
  if ($) {
    a = false;
  }
  while ($LOOP_UNROLL_9) {
    if (a) {
      if ($) {
        a = false;
      }
    }
    else {
      break;
    }
  }
}
`````


## Todos triggered


- (todo) Support referencing this builtin in isFree: $


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
