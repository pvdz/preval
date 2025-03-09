# Preval test case

# if_is_boolean.md

> Tofix > if is boolean

`let y = true; if (x) { y = false; }` is really `let y = Boolean(x)`

## Input

`````js filename=intro
let y = true;
let x = !$;
if (x) {
  if ($) {
    x = false;
  } else {
  }
} else {
  y = false;
}
if (y) {
  while ($LOOP_UNROLL_9) {
    if (x) {
      if ($) {
        x = false;
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
  let tmpClusterSSA_x /*:boolean*/ = true;
  if ($) {
    tmpClusterSSA_x = false;
  } else {
  }
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_x) {
      if ($) {
        tmpClusterSSA_x = false;
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
  let tmpClusterSSA_x = true;
  if ($) {
    tmpClusterSSA_x = false;
  }
  while (true) {
    if (tmpClusterSSA_x) {
      if ($) {
        tmpClusterSSA_x = false;
      }
    } else {
      break;
    }
  }
}
`````

## Pre Normal


`````js filename=intro
let y = true;
let x = !$;
if (x) {
  if ($) {
    x = false;
  } else {
  }
} else {
  y = false;
}
if (y) {
  while ($LOOP_UNROLL_9) {
    if (x) {
      if ($) {
        x = false;
      } else {
      }
    } else {
      break;
    }
  }
} else {
}
`````

## Normalized


`````js filename=intro
let y = true;
let x = !$;
if (x) {
  if ($) {
    x = false;
  } else {
  }
} else {
  y = false;
}
if (y) {
  while ($LOOP_UNROLL_9) {
    if (x) {
      if ($) {
        x = false;
      } else {
      }
    } else {
      break;
    }
  }
} else {
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