# Preval test case

# loop_could_be_okay_break4.md

> Ssa > Loop could be okay break4

## Input

`````js filename=intro
let tmpLoopRetCode = true;
while (tmpLoopRetCode) {
  if ($) {
    tmpLoopRetCode = false;
  } else {
  }
}
`````


## Settled


`````js filename=intro
if ($) {
} else {
  let tmpLoopRetCode /*:boolean*/ = true;
  while ($LOOP_UNROLLS_LEFT_10) {
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
if (!$) {
  let tmpLoopRetCode = true;
  while (true) {
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
if ($) {

}
else {
  let a = true;
  while ($LOOP_UNROLLS_LEFT_10) {
    if ($) {
      a = false;
    }
    if (a) {

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
let tmpLoopRetCode = true;
while (true) {
  if (tmpLoopRetCode) {
    if ($) {
      tmpLoopRetCode = false;
    } else {
    }
  } else {
    break;
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
