# Preval test case

# kept.md

> Continue > Kept
>
> Example of where continue is not eliminated

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


## Settled


`````js filename=intro
const $continue /*:()=>undefined*/ = function () {
  debugger;
  const tmpIfTest /*:unknown*/ = $();
  if (tmpIfTest) {
    const tmpIfTest$1 /*:unknown*/ = $();
    if (tmpIfTest$1) {
      $continue();
      return undefined;
    } else {
    }
  } else {
  }
  const tmpIfTest$3 /*:unknown*/ = $();
  if (tmpIfTest$3) {
    return undefined;
  } else {
    $continue();
    return undefined;
  }
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $continue: {
    const tmpIfTest$5 /*:unknown*/ = $();
    if (tmpIfTest$5) {
      const tmpIfTest$7 /*:unknown*/ = $();
      if (tmpIfTest$7) {
        break $continue;
      } else {
      }
    } else {
    }
    const tmpIfTest$9 /*:unknown*/ = $();
    if (tmpIfTest$9) {
      break;
    } else {
    }
  }
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  nestedLoop: {
    const tmpIfTest$11 /*:unknown*/ = $();
    if (tmpIfTest$11) {
      const tmpIfTest$13 /*:unknown*/ = $();
      if (tmpIfTest$13) {
        break nestedLoop;
      } else {
      }
    } else {
    }
    const tmpIfTest$15 /*:unknown*/ = $();
    if (tmpIfTest$15) {
      break;
    } else {
    }
  }
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$17 /*:unknown*/ = $();
  if (tmpIfTest$17) {
    const tmpIfTest$19 /*:unknown*/ = $();
    if (tmpIfTest$19) {
      const tmpIfTest$21 /*:unknown*/ = $();
      if (tmpIfTest$21) {
        break;
      } else {
      }
    } else {
    }
  } else {
  }
}
$continue();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const $continue = function () {
  if ($()) {
    if ($()) {
      $continue();
      return undefined;
    }
  }
  const tmpIfTest$3 = $();
  if (!tmpIfTest$3) {
    $continue();
  }
};
while (true) {
  $continue: {
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
while (true) {
  nestedLoop: {
    if ($()) {
      if ($()) {
        break nestedLoop;
      }
    }
    if ($()) {
      break;
    }
  }
}
while (true) {
  if ($()) {
    if ($()) {
      if ($()) {
        break;
      }
    }
  }
}
$continue();
`````


## PST Settled
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
  $continue: {
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  nestedLoop: {
    const h = $();
    if (h) {
      const i = $();
      if (i) {
        break nestedLoop;
      }
    }
    const j = $();
    if (j) {
      break;
    }
  }
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const k = $();
  if (k) {
    const l = $();
    if (l) {
      const m = $();
      if (m) {
        break;
      }
    }
  }
}
a();
`````


## Todos triggered


- Support this node type in isFree: LabeledStatement


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same
