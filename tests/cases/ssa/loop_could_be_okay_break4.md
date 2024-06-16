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

## Output


`````js filename=intro
let tmpLoopRetCode = true;
if ($) {
  tmpLoopRetCode = false;
} else {
}
if (tmpLoopRetCode) {
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
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
if ($) {
  a = false;
}
if (a) {
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

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
