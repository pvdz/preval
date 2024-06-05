# Preval test case

# kept.md

> Continue > Kept
>
> Example of where continue is not eliminated

#TODO

## Input

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if ($()) {
    if ($()) {
      continue;
    }
  }
  if ($()) {
    break;
  }
}

exit: while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  again: while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    if ($()) {
      if ($()) {
        break again;
      }
    }
    if ($()) {
      break exit;
    }
  }
}

while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let continued = false;
  if ($()) {
    if ($()) {
      
    } else {
      continued = true;
    }
  } else {
    continued = true;
  }
  if (!continued) {
    if ($()) {
      break;
    }
  }
}


function $continue() {
  if ($()) {
    if ($()) {
      $continue();
      return;
    }
  }
  if ($()) {
    return;
  }
  $continue();
  return;
}
$continue();

`````

## Pre Normal

`````js filename=intro
let $continue = function () {
  debugger;
  if ($()) {
    if ($()) {
      $continue();
      return;
    }
  }
  if ($()) {
    return;
  }
  $continue();
  return;
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $continue: {
    {
      if ($()) {
        if ($()) {
          break $continue;
        }
      }
      if ($()) {
        break;
      }
    }
  }
}
exit: while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  again: while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    if ($()) {
      if ($()) {
        break again;
      }
    }
    if ($()) {
      break exit;
    }
  }
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let continued = false;
  if ($()) {
    if ($()) {
    } else {
      continued = true;
    }
  } else {
    continued = true;
  }
  if (!continued) {
    if ($()) {
      break;
    }
  }
}
$continue();
`````

## Normalized

`````js filename=intro
let $continue = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    const tmpIfTest$1 = $();
    if (tmpIfTest$1) {
      $continue();
      return undefined;
    } else {
    }
  } else {
  }
  const tmpIfTest$3 = $();
  if (tmpIfTest$3) {
    return undefined;
  } else {
    $continue();
    return undefined;
  }
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $continue: {
    const tmpIfTest$5 = $();
    if (tmpIfTest$5) {
      const tmpIfTest$7 = $();
      if (tmpIfTest$7) {
        break $continue;
      } else {
      }
    } else {
    }
    const tmpIfTest$9 = $();
    if (tmpIfTest$9) {
      break;
    } else {
    }
  }
}
exit: {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    again: {
      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
        const tmpIfTest$11 = $();
        if (tmpIfTest$11) {
          const tmpIfTest$13 = $();
          if (tmpIfTest$13) {
            break again;
          } else {
          }
        } else {
        }
        const tmpIfTest$15 = $();
        if (tmpIfTest$15) {
          break exit;
        } else {
        }
      }
    }
  }
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let continued = false;
  const tmpIfTest$17 = $();
  if (tmpIfTest$17) {
    const tmpIfTest$19 = $();
    if (tmpIfTest$19) {
    } else {
      continued = true;
    }
  } else {
    continued = true;
  }
  if (continued) {
  } else {
    const tmpIfTest$21 = $();
    if (tmpIfTest$21) {
      break;
    } else {
    }
  }
}
$continue();
`````

## Output

`````js filename=intro
const $continue = function () {
  debugger;
  const tmpIfTest = $();
  if (tmpIfTest) {
    const tmpIfTest$1 = $();
    if (tmpIfTest$1) {
      $continue();
      return undefined;
    } else {
    }
  } else {
  }
  const tmpIfTest$3 = $();
  if (tmpIfTest$3) {
    return undefined;
  } else {
    $continue();
    return undefined;
  }
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $continue: {
    const tmpIfTest$5 = $();
    if (tmpIfTest$5) {
      const tmpIfTest$7 = $();
      if (tmpIfTest$7) {
        break $continue;
      } else {
      }
    } else {
    }
    const tmpIfTest$9 = $();
    if (tmpIfTest$9) {
      break;
    } else {
    }
  }
}
exit: {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpIfTest$11 = $();
      if (tmpIfTest$11) {
        const tmpIfTest$13 = $();
        if (tmpIfTest$13) {
          break;
        } else {
        }
      } else {
      }
      const tmpIfTest$15 = $();
      if (tmpIfTest$15) {
        break exit;
      } else {
      }
    }
  }
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let continued = false;
  const tmpIfTest$17 = $();
  if (tmpIfTest$17) {
    const tmpIfTest$19 = $();
    if (tmpIfTest$19) {
    } else {
      continued = true;
    }
  } else {
    continued = true;
  }
  if (continued) {
  } else {
    const tmpIfTest$21 = $();
    if (tmpIfTest$21) {
      break;
    } else {
    }
  }
}
$continue();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $();
  if (b) {
    const c = $();
    if (c) {
      a();
      return undefined;
    }
  }
  const d = $();
  if (d) {
    return undefined;
  }
  else {
    a();
    return undefined;
  }
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $continue:   {
    const e = $();
    if (e) {
      const f = $();
      if (f) {
        break $continue;
      }
    }
    const g = $();
    if (g) {
      break;
    }
  }
}
exit: {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const h = $();
      if (h) {
        const i = $();
        if (i) {
          break;
        }
      }
      const j = $();
      if (j) {
        break exit;
      }
    }
  }
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let k = false;
  const l = $();
  if (l) {
    const m = $();
    if (m) {

    }
    else {
      k = true;
    }
  }
  else {
    k = true;
  }
  if (k) {

  }
  else {
    const n = $();
    if (n) {
      break;
    }
  }
}
a();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - 3: 
 - 4: 
 - 5: 
 - 6: 
 - 7: 
 - 8: 
 - 9: 
 - 10: 
 - 11: 
 - 12: 
 - 13: 
 - 14: 
 - 15: 
 - 16: 
 - 17: 
 - 18: 
 - 19: 
 - 20: 
 - 21: 
 - 22: 
 - 23: 
 - 24: 
 - 25: 
 - 26: 
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
