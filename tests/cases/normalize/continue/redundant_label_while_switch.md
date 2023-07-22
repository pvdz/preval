# Preval test case

# redundant_label_while_switch.md

> Normalize > Continue > Redundant label while switch
>
> If a labeled break does the same thing without the label then the label should be dropped

#TODO

## Input

`````js filename=intro
let x = $(2);
exit: while (x) {
  $(1);
  
  if ($(1)) {
    x = $(3);
  }
  if (x) {
    switch ($(1)) {
      case 0:
        $(0);
      case 1:
        $(1);
        continue exit;
      case 2:
        $(2);
    }
  } else {
    x = $(4);
  }
}
`````

## Pre Normal

`````js filename=intro
let x = $(2);
exit: while (x) {
  $(1);
  if ($(1)) {
    x = $(3);
  }
  if (x) {
    {
      const tmpSwitchValue = $(1);
      let tmpSwitchCaseToStart = 3;
      if (0 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
      else if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
      else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
      else;
      tmpSwitchBreak: {
        if (tmpSwitchCaseToStart <= 0) {
          $(0);
        }
        if (tmpSwitchCaseToStart <= 1) {
          $(1);
          continue exit;
        }
        if (tmpSwitchCaseToStart <= 2) {
          $(2);
        }
      }
    }
  } else {
    x = $(4);
  }
}
`````

## Normalized

`````js filename=intro
let x = $(2);
while (true) {
  if (x) {
    $(1);
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      x = $(3);
    } else {
    }
    if (x) {
      const tmpSwitchValue = $(1);
      let tmpSwitchCaseToStart = 3;
      const tmpIfTest$1 = 0 === tmpSwitchValue;
      if (tmpIfTest$1) {
        tmpSwitchCaseToStart = 0;
      } else {
        const tmpIfTest$3 = 1 === tmpSwitchValue;
        if (tmpIfTest$3) {
          tmpSwitchCaseToStart = 1;
        } else {
          const tmpIfTest$5 = 2 === tmpSwitchValue;
          if (tmpIfTest$5) {
            tmpSwitchCaseToStart = 2;
          } else {
          }
        }
      }
      const tmpIfTest$7 = tmpSwitchCaseToStart <= 0;
      if (tmpIfTest$7) {
        $(0);
      } else {
      }
      const tmpIfTest$9 = tmpSwitchCaseToStart <= 1;
      if (tmpIfTest$9) {
        $(1);
        continue;
      } else {
        const tmpIfTest$11 = tmpSwitchCaseToStart <= 2;
        if (tmpIfTest$11) {
          $(2);
        } else {
        }
      }
    } else {
      x = $(4);
    }
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let x = $(2);
let $tmpLoopUnrollCheck = true;
if (x) {
  $(1);
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    x = $(3);
  } else {
  }
  if (x) {
    const tmpSwitchValue = $(1);
    let tmpSwitchCaseToStart = 3;
    const tmpIfTest$1 = 0 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 0;
    } else {
      const tmpIfTest$3 = 1 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 1;
      } else {
        const tmpIfTest$5 = 2 === tmpSwitchValue;
        if (tmpIfTest$5) {
          tmpSwitchCaseToStart = 2;
        } else {
        }
      }
    }
    const tmpIfTest$7 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$7) {
      $(0);
    } else {
    }
    const tmpIfTest$9 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$9) {
      $(1);
    } else {
      const tmpIfTest$11 = tmpSwitchCaseToStart <= 2;
      if (tmpIfTest$11) {
        $(2);
      } else {
      }
    }
  } else {
    x = $(4);
  }
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (x) {
      $(1);
      const tmpIfTest$2 = $(1);
      if (tmpIfTest$2) {
        x = $(3);
      } else {
      }
      if (x) {
        const tmpSwitchValue$1 = $(1);
        let tmpSwitchCaseToStart$1 = 3;
        const tmpIfTest$4 = 0 === tmpSwitchValue$1;
        if (tmpIfTest$4) {
          tmpSwitchCaseToStart$1 = 0;
        } else {
          const tmpIfTest$10 = 1 === tmpSwitchValue$1;
          if (tmpIfTest$10) {
            tmpSwitchCaseToStart$1 = 1;
          } else {
            const tmpIfTest$12 = 2 === tmpSwitchValue$1;
            if (tmpIfTest$12) {
              tmpSwitchCaseToStart$1 = 2;
            } else {
            }
          }
        }
        const tmpIfTest$6 = tmpSwitchCaseToStart$1 <= 0;
        if (tmpIfTest$6) {
          $(0);
        } else {
        }
        const tmpIfTest$8 = tmpSwitchCaseToStart$1 <= 1;
        if (tmpIfTest$8) {
          $(1);
        } else {
          const tmpIfTest$14 = tmpSwitchCaseToStart$1 <= 2;
          if (tmpIfTest$14) {
            $(2);
          } else {
          }
        }
      } else {
        x = $(4);
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
let a = $( 2 );
let b = true;
if (a) {
  $( 1 );
  const c = $( 1 );
  if (c) {
    a = $( 3 );
  }
  if (a) {
    const d = $( 1 );
    let e = 3;
    const f = 0 === d;
    if (f) {
      e = 0;
    }
    else {
      const g = 1 === d;
      if (g) {
        e = 1;
      }
      else {
        const h = 2 === d;
        if (h) {
          e = 2;
        }
      }
    }
    const i = e <= 0;
    if (i) {
      $( 0 );
    }
    const j = e <= 1;
    if (j) {
      $( 1 );
    }
    else {
      const k = e <= 2;
      if (k) {
        $( 2 );
      }
    }
  }
  else {
    a = $( 4 );
  }
}
else {
  b = false;
}
if (b) {
  while ($LOOP_UNROLL_10) {
    if (a) {
      $( 1 );
      const l = $( 1 );
      if (l) {
        a = $( 3 );
      }
      if (a) {
        const m = $( 1 );
        let n = 3;
        const o = 0 === m;
        if (o) {
          n = 0;
        }
        else {
          const p = 1 === m;
          if (p) {
            n = 1;
          }
          else {
            const q = 2 === m;
            if (q) {
              n = 2;
            }
          }
        }
        const r = n <= 0;
        if (r) {
          $( 0 );
        }
        const s = n <= 1;
        if (s) {
          $( 1 );
        }
        else {
          const t = n <= 2;
          if (t) {
            $( 2 );
          }
        }
      }
      else {
        a = $( 4 );
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
 - 1: 2
 - 2: 1
 - 3: 1
 - 4: 3
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 3
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 3
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 3
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 3
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
