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

## Output


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

## PST Output

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

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
