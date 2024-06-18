# Preval test case

# kept5.md

> Continue > Kept5
>
> Example of where continue is not eliminated

## Input

`````js filename=intro

exit: while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  again: while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    if ($(1)) {
      if ($(2)) {
        break again;
      }
    }
    if ($(3)) {
      break exit;
    }
  }
}
$(4);

while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let continued = false;
  if ($(5)) {
    if ($(6)) {
      
    } else {
      continued = true;
    }
  } else {
    continued = true;
  }
  if (!continued) {
    if ($(7)) {
      break;
    }
  }
}
$(8);

`````

## Pre Normal


`````js filename=intro
exit: while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  again: while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    if ($(1)) {
      if ($(2)) {
        break again;
      }
    }
    if ($(3)) {
      break exit;
    }
  }
}
$(4);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let continued = false;
  if ($(5)) {
    if ($(6)) {
    } else {
      continued = true;
    }
  } else {
    continued = true;
  }
  if (!continued) {
    if ($(7)) {
      break;
    }
  }
}
$(8);
`````

## Normalized


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  nestedLoop: {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpIfTest$1 = $(2);
      if (tmpIfTest$1) {
        break nestedLoop;
      } else {
      }
    } else {
    }
    const tmpIfTest$3 = $(3);
    if (tmpIfTest$3) {
      break;
    } else {
    }
  }
}
$(4);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let continued = false;
  const tmpIfTest$5 = $(5);
  if (tmpIfTest$5) {
    const tmpIfTest$7 = $(6);
    if (tmpIfTest$7) {
    } else {
      continued = true;
    }
  } else {
    continued = true;
  }
  if (continued) {
  } else {
    const tmpIfTest$9 = $(7);
    if (tmpIfTest$9) {
      break;
    } else {
    }
  }
}
$(8);
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  nestedLoop: {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpIfTest$1 = $(2);
      if (tmpIfTest$1) {
        break nestedLoop;
      } else {
      }
    } else {
    }
    const tmpIfTest$3 = $(3);
    if (tmpIfTest$3) {
      break;
    } else {
    }
  }
}
$(4);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpIfTest$5 = $(5);
  if (tmpIfTest$5) {
    const tmpIfTest$7 = $(6);
    if (tmpIfTest$7) {
      const tmpIfTest$9 = $(7);
      if (tmpIfTest$9) {
        break;
      } else {
      }
    } else {
    }
  } else {
  }
}
$(8);
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  nestedLoop:   {
    const a = $( 1 );
    if (a) {
      const b = $( 2 );
      if (b) {
        break nestedLoop;
      }
    }
    const c = $( 3 );
    if (c) {
      break;
    }
  }
}
$( 4 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const d = $( 5 );
  if (d) {
    const e = $( 6 );
    if (e) {
      const f = $( 7 );
      if (f) {
        break;
      }
    }
  }
}
$( 8 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: 1
 - 6: 2
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 2
 - 11: 1
 - 12: 2
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 2
 - 17: 1
 - 18: 2
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 2
 - 23: 1
 - 24: 2
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
