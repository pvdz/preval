# Preval test case

# deault_middle_without.md

> Normalize > Switch > Deault middle without
>
> Normalize switches

The problem at hand is that default is allowed to jump back.

The input below should call $ with 10, 20, 30, 40, 50, and then 'd', 3, and 4. 

More complex cases are possible, where breaks happen at arbitrary points rather than top level. Send help.

I think it's "okay" to take the remaining cases and duplicate their consequent statements as the body of the default. Best case that's an empty list when the default is the last case, worst case it makes the rare situation where this occurs anyways, work in a less efficient way. At least it should still work... But some problems may arise, I dunno.

```js
let x = 6;
let fall = false;
exit: {
  if (x === $(10)) {
    $(1);
    break exit;
  }
  if (fall || x === $(20)) {
    $(1);
    fall = true
  }
  if (fall || x === $(30)) {
    $(3);
    fall = true;
  }
  if (fall || x === $(40)) {
    $(4);
    break exit;
  }
  if (fall || x === $(50)) {
    $(5);
  }
}
```

## Input

`````js filename=intro
switch (6) {
  case $(10): $(1); break;
  case $(20): $(2);
  case $(30): $(3);
  case $(40): $(4); break;
  case $(50): $(5); break;
}
`````


## Settled


`````js filename=intro
let tmpSwitchCaseToStart /*:number*/ = 5;
const tmpBinLhs /*:unknown*/ = $(10);
const tmpIfTest /*:boolean*/ = tmpBinLhs === 6;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 /*:unknown*/ = $(20);
  const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$1 === 6;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
    const tmpBinLhs$3 /*:unknown*/ = $(30);
    const tmpIfTest$3 /*:boolean*/ = tmpBinLhs$3 === 6;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 2;
    } else {
      const tmpBinLhs$5 /*:unknown*/ = $(40);
      const tmpIfTest$5 /*:boolean*/ = tmpBinLhs$5 === 6;
      if (tmpIfTest$5) {
        tmpSwitchCaseToStart = 3;
      } else {
        const tmpBinLhs$7 /*:unknown*/ = $(50);
        const tmpIfTest$7 /*:boolean*/ = tmpBinLhs$7 === 6;
        if (tmpIfTest$7) {
          tmpSwitchCaseToStart = 4;
        } else {
        }
      }
    }
  }
}
const tmpIfTest$9 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$9) {
  $(1);
} else {
  const tmpIfTest$11 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$11) {
    $(2);
  } else {
  }
  const tmpIfTest$13 /*:boolean*/ = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$13) {
    $(3);
  } else {
  }
  const tmpIfTest$15 /*:boolean*/ = tmpSwitchCaseToStart <= 3;
  if (tmpIfTest$15) {
    $(4);
  } else {
    const tmpIfTest$17 /*:boolean*/ = tmpSwitchCaseToStart <= 4;
    if (tmpIfTest$17) {
      $(5);
    } else {
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpSwitchCaseToStart = 5;
if ($(10) === 6) {
  tmpSwitchCaseToStart = 0;
} else {
  if ($(20) === 6) {
    tmpSwitchCaseToStart = 1;
  } else {
    if ($(30) === 6) {
      tmpSwitchCaseToStart = 2;
    } else {
      if ($(40) === 6) {
        tmpSwitchCaseToStart = 3;
      } else {
        if ($(50) === 6) {
          tmpSwitchCaseToStart = 4;
        }
      }
    }
  }
}
if (tmpSwitchCaseToStart <= 0) {
  $(1);
} else {
  if (tmpSwitchCaseToStart <= 1) {
    $(2);
  }
  if (tmpSwitchCaseToStart <= 2) {
    $(3);
  }
  if (tmpSwitchCaseToStart <= 3) {
    $(4);
  } else {
    if (tmpSwitchCaseToStart <= 4) {
      $(5);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 5;
const b = $( 10 );
const c = b === 6;
if (c) {
  a = 0;
}
else {
  const d = $( 20 );
  const e = d === 6;
  if (e) {
    a = 1;
  }
  else {
    const f = $( 30 );
    const g = f === 6;
    if (g) {
      a = 2;
    }
    else {
      const h = $( 40 );
      const i = h === 6;
      if (i) {
        a = 3;
      }
      else {
        const j = $( 50 );
        const k = j === 6;
        if (k) {
          a = 4;
        }
      }
    }
  }
}
const l = a <= 0;
if (l) {
  $( 1 );
}
else {
  const m = a <= 1;
  if (m) {
    $( 2 );
  }
  const n = a <= 2;
  if (n) {
    $( 3 );
  }
  const o = a <= 3;
  if (o) {
    $( 4 );
  }
  else {
    const p = a <= 4;
    if (p) {
      $( 5 );
    }
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpSwitchValue = 6;
let tmpSwitchCaseToStart = 5;
const tmpBinLhs = $(10);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
tmpSwitchBreak: {
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpBinLhs$1 = $(20);
    const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpBinLhs$3 = $(30);
      const tmpIfTest$3 = tmpBinLhs$3 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 2;
      } else {
        const tmpBinLhs$5 = $(40);
        const tmpIfTest$5 = tmpBinLhs$5 === tmpSwitchValue;
        if (tmpIfTest$5) {
          tmpSwitchCaseToStart = 3;
        } else {
          const tmpBinLhs$7 = $(50);
          const tmpIfTest$7 = tmpBinLhs$7 === tmpSwitchValue;
          if (tmpIfTest$7) {
            tmpSwitchCaseToStart = 4;
          } else {
          }
        }
      }
    }
  }
  const tmpIfTest$9 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$9) {
    $(1);
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$11 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$11) {
      $(2);
    } else {
    }
    const tmpIfTest$13 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$13) {
      $(3);
    } else {
    }
    const tmpIfTest$15 = tmpSwitchCaseToStart <= 3;
    if (tmpIfTest$15) {
      $(4);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$17 = tmpSwitchCaseToStart <= 4;
      if (tmpIfTest$17) {
        $(5);
        break tmpSwitchBreak;
      } else {
      }
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
 - 1: 10
 - 2: 20
 - 3: 30
 - 4: 40
 - 5: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
