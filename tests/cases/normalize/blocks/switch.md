# Preval test case

# switch.md

> Normalize > Blocks > Switch
>
> Add blocks to sub-statements. Let's do this for cases as well, for now. Maybe that's a mistake :)

## Input

`````js filename=intro
switch ($(1)) {
  case $(2): $(3);
  case $(4):
  case $(5):
  case $(6): break;
  case $(7):
  default:
}
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
const tmpBinLhs /*:unknown*/ = $(2);
let tmpSwitchCaseToStart /*:number*/ = 5;
const tmpIfTest /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 /*:unknown*/ = $(4);
  const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
    const tmpBinLhs$3 /*:unknown*/ = $(5);
    const tmpIfTest$3 /*:boolean*/ = tmpBinLhs$3 === tmpSwitchValue;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 2;
    } else {
      const tmpBinLhs$5 /*:unknown*/ = $(6);
      const tmpIfTest$5 /*:boolean*/ = tmpBinLhs$5 === tmpSwitchValue;
      if (tmpIfTest$5) {
        tmpSwitchCaseToStart = 3;
      } else {
        const tmpBinLhs$7 /*:unknown*/ = $(7);
        const tmpIfTest$7 /*:boolean*/ = tmpBinLhs$7 === tmpSwitchValue;
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
  $(3);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
const tmpBinLhs = $(2);
let tmpSwitchCaseToStart = 5;
if (tmpBinLhs === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if ($(4) === tmpSwitchValue) {
    tmpSwitchCaseToStart = 1;
  } else {
    if ($(5) === tmpSwitchValue) {
      tmpSwitchCaseToStart = 2;
    } else {
      if ($(6) === tmpSwitchValue) {
        tmpSwitchCaseToStart = 3;
      } else {
        if ($(7) === tmpSwitchValue) {
          tmpSwitchCaseToStart = 4;
        }
      }
    }
  }
}
if (tmpSwitchCaseToStart <= 0) {
  $(3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
let c = 5;
const d = b === a;
if (d) {
  c = 0;
}
else {
  const e = $( 4 );
  const f = e === a;
  if (f) {
    c = 1;
  }
  else {
    const g = $( 5 );
    const h = g === a;
    if (h) {
      c = 2;
    }
    else {
      const i = $( 6 );
      const j = i === a;
      if (j) {
        c = 3;
      }
      else {
        const k = $( 7 );
        const l = k === a;
        if (l) {
          c = 4;
        }
      }
    }
  }
}
const m = c <= 0;
if (m) {
  $( 3 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 5;
const tmpBinLhs = $(2);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
tmpSwitchBreak: {
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpBinLhs$1 = $(4);
    const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpBinLhs$3 = $(5);
      const tmpIfTest$3 = tmpBinLhs$3 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 2;
      } else {
        const tmpBinLhs$5 = $(6);
        const tmpIfTest$5 = tmpBinLhs$5 === tmpSwitchValue;
        if (tmpIfTest$5) {
          tmpSwitchCaseToStart = 3;
        } else {
          const tmpBinLhs$7 = $(7);
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
    $(3);
  } else {
  }
  const tmpIfTest$11 = tmpSwitchCaseToStart <= 1;
  const tmpIfTest$13 = tmpSwitchCaseToStart <= 2;
  const tmpIfTest$15 = tmpSwitchCaseToStart <= 3;
  if (tmpIfTest$15) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$17 = tmpSwitchCaseToStart <= 4;
    const tmpIfTest$19 = tmpSwitchCaseToStart <= 5;
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 4
 - 4: 5
 - 5: 6
 - 6: 7
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
