# Preval test case

# redundant_label_while_switch.md

> Normalize > Continue > Redundant label while switch
>
> If a labeled break does the same thing without the label then the label should be dropped

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


## Settled


`````js filename=intro
let x /*:unknown*/ = $(2);
if (x) {
  $(1);
  const tmpIfTest /*:unknown*/ = $(1);
  if (tmpIfTest) {
    x = $(3);
  } else {
  }
  if (x) {
    const tmpSwitchValue /*:unknown*/ = $(1);
    let tmpSwitchCaseToStart /*:number*/ = 3;
    const tmpIfTest$1 /*:boolean*/ = 0 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 0;
    } else {
      const tmpIfTest$3 /*:boolean*/ = 1 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 1;
      } else {
        const tmpIfTest$5 /*:boolean*/ = 2 === tmpSwitchValue;
        if (tmpIfTest$5) {
          tmpSwitchCaseToStart = 2;
        } else {
        }
      }
    }
    const tmpIfTest$7 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$7) {
      $(0);
    } else {
    }
    const tmpIfTest$9 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$9) {
      $(1);
    } else {
      const tmpIfTest$11 /*:boolean*/ = tmpSwitchCaseToStart <= 2;
      if (tmpIfTest$11) {
        $(2);
      } else {
      }
    }
  } else {
    x = $(4);
  }
  while ($LOOP_UNROLL_10) {
    if (x) {
      $(1);
      const tmpIfTest$2 /*:unknown*/ = $(1);
      if (tmpIfTest$2) {
        x = $(3);
      } else {
      }
      if (x) {
        const tmpSwitchValue$1 /*:unknown*/ = $(1);
        let tmpSwitchCaseToStart$1 /*:number*/ = 3;
        const tmpIfTest$4 /*:boolean*/ = 0 === tmpSwitchValue$1;
        if (tmpIfTest$4) {
          tmpSwitchCaseToStart$1 = 0;
        } else {
          const tmpIfTest$10 /*:boolean*/ = 1 === tmpSwitchValue$1;
          if (tmpIfTest$10) {
            tmpSwitchCaseToStart$1 = 1;
          } else {
            const tmpIfTest$12 /*:boolean*/ = 2 === tmpSwitchValue$1;
            if (tmpIfTest$12) {
              tmpSwitchCaseToStart$1 = 2;
            } else {
            }
          }
        }
        const tmpIfTest$6 /*:boolean*/ = tmpSwitchCaseToStart$1 <= 0;
        if (tmpIfTest$6) {
          $(0);
        } else {
        }
        const tmpIfTest$8 /*:boolean*/ = tmpSwitchCaseToStart$1 <= 1;
        if (tmpIfTest$8) {
          $(1);
        } else {
          const tmpIfTest$14 /*:boolean*/ = tmpSwitchCaseToStart$1 <= 2;
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


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = $(2);
if (x) {
  $(1);
  if ($(1)) {
    x = $(3);
  }
  if (x) {
    const tmpSwitchValue = $(1);
    let tmpSwitchCaseToStart = 3;
    if (0 === tmpSwitchValue) {
      tmpSwitchCaseToStart = 0;
    } else {
      if (1 === tmpSwitchValue) {
        tmpSwitchCaseToStart = 1;
      } else {
        if (2 === tmpSwitchValue) {
          tmpSwitchCaseToStart = 2;
        }
      }
    }
    if (tmpSwitchCaseToStart <= 0) {
      $(0);
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(1);
    } else {
      if (tmpSwitchCaseToStart <= 2) {
        $(2);
      }
    }
  } else {
    x = $(4);
  }
  while (true) {
    if (x) {
      $(1);
      if ($(1)) {
        x = $(3);
      }
      if (x) {
        const tmpSwitchValue$1 = $(1);
        let tmpSwitchCaseToStart$1 = 3;
        if (0 === tmpSwitchValue$1) {
          tmpSwitchCaseToStart$1 = 0;
        } else {
          if (1 === tmpSwitchValue$1) {
            tmpSwitchCaseToStart$1 = 1;
          } else {
            if (2 === tmpSwitchValue$1) {
              tmpSwitchCaseToStart$1 = 2;
            }
          }
        }
        if (tmpSwitchCaseToStart$1 <= 0) {
          $(0);
        }
        if (tmpSwitchCaseToStart$1 <= 1) {
          $(1);
        } else {
          if (tmpSwitchCaseToStart$1 <= 2) {
            $(2);
          }
        }
      } else {
        x = $(4);
      }
    } else {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( 2 );
if (a) {
  $( 1 );
  const b = $( 1 );
  if (b) {
    a = $( 3 );
  }
  if (a) {
    const c = $( 1 );
    let d = 3;
    const e = 0 === c;
    if (e) {
      d = 0;
    }
    else {
      const f = 1 === c;
      if (f) {
        d = 1;
      }
      else {
        const g = 2 === c;
        if (g) {
          d = 2;
        }
      }
    }
    const h = d <= 0;
    if (h) {
      $( 0 );
    }
    const i = d <= 1;
    if (i) {
      $( 1 );
    }
    else {
      const j = d <= 2;
      if (j) {
        $( 2 );
      }
    }
  }
  else {
    a = $( 4 );
  }
  while ($LOOP_UNROLL_10) {
    if (a) {
      $( 1 );
      const k = $( 1 );
      if (k) {
        a = $( 3 );
      }
      if (a) {
        const l = $( 1 );
        let m = 3;
        const n = 0 === l;
        if (n) {
          m = 0;
        }
        else {
          const o = 1 === l;
          if (o) {
            m = 1;
          }
          else {
            const p = 2 === l;
            if (p) {
              m = 2;
            }
          }
        }
        const q = m <= 0;
        if (q) {
          $( 0 );
        }
        const r = m <= 1;
        if (r) {
          $( 1 );
        }
        else {
          const s = m <= 2;
          if (s) {
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same
