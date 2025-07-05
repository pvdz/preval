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
  while ($LOOP_UNROLLS_LEFT_9) {
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
let tmpClusterSSA_tmpLoopRetCode /*:boolean*/ = !$;
if ($) {
} else {
  while ($LOOP_UNROLLS_LEFT_9) {
    if (tmpClusterSSA_tmpLoopRetCode) {
      if ($) {
        tmpClusterSSA_tmpLoopRetCode = false;
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
let tmpClusterSSA_tmpLoopRetCode = !$;
if (!$) {
  while (true) {
    if (tmpClusterSSA_tmpLoopRetCode) {
      if ($) {
        tmpClusterSSA_tmpLoopRetCode = false;
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
let a = !$;
if ($) {

}
else {
  while ($LOOP_UNROLLS_LEFT_9) {
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


## Normalized
(This is what phase1 received the first time)

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
  while ($LOOP_UNROLLS_LEFT_9) {
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
