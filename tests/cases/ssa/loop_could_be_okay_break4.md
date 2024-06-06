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
let $tmpLoopUnrollCheck = false;
if ($) {
  tmpLoopRetCode = false;
} else {
  $tmpLoopUnrollCheck = tmpLoopRetCode;
}
if (tmpLoopRetCode) {
  if ($) {
    tmpLoopRetCode = false;
  } else {
  }
} else {
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

## PST Output

With rename=true

`````js filename=intro
let a = true;
let b = false;
if ($) {
  a = false;
}
else {
  b = a;
}
if (a) {
  if ($) {
    a = false;
  }
}
if (b) {
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

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
