# Preval test case

# kept2.md

> Continue > Kept2
>
> Example of where continue is not eliminated

#TODO

## Input

`````js filename=intro
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
`````

## Pre Normal


`````js filename=intro
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
`````

## Normalized


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  nestedLoop: {
    const tmpIfTest = $();
    if (tmpIfTest) {
      const tmpIfTest$1 = $();
      if (tmpIfTest$1) {
        break nestedLoop;
      } else {
      }
    } else {
    }
    const tmpIfTest$3 = $();
    if (tmpIfTest$3) {
      break;
    } else {
    }
  }
}
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  nestedLoop: {
    const tmpIfTest = $();
    if (tmpIfTest) {
      const tmpIfTest$1 = $();
      if (tmpIfTest$1) {
        break nestedLoop;
      } else {
      }
    } else {
    }
    const tmpIfTest$3 = $();
    if (tmpIfTest$3) {
      break;
    } else {
    }
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  nestedLoop:   {
    const a = $();
    if (a) {
      const b = $();
      if (b) {
        break nestedLoop;
      }
    }
    const c = $();
    if (c) {
      break;
    }
  }
}
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
