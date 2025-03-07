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
let tmpLoopRetCode /*:boolean*/ = true;
if ($) {
} else {
  while ($LOOP_UNROLL_10) {
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
let tmpLoopRetCode = true;
if (!$) {
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

## Pre Normal


`````js filename=intro
let tmpLoopRetCode = true;
while (tmpLoopRetCode) {
  if ($) {
    tmpLoopRetCode = false;
  } else {
  }
}
`````

## Normalized


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

## PST Settled
With rename=true

`````js filename=intro
let a = true;
if ($) {

}
else {
  while ($LOOP_UNROLL_10) {
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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Support referencing this builtin in isFree: $