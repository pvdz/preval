# Preval test case

# early_return.md

> Normalize > Switch > Early return
>
> Sorting out the branching stuff

## Input

`````js filename=intro
function f() {
  switch ($(1)) {
    case 0:
      $(2);
      break;
    case $(1):
      $(3);
    case $(4):
      $(5);
      return $(6);
    case $(7):
      break;
  }
}
$(f());
`````

## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(1);
let tmpSwitchCaseToStart /*:number*/ = 4;
const tmpIfTest /*:boolean*/ = 0 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs /*:unknown*/ = $(1);
  const tmpIfTest$1 /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
    const tmpBinLhs$1 /*:unknown*/ = $(4);
    const tmpIfTest$3 /*:boolean*/ = tmpBinLhs$1 === tmpSwitchValue;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 2;
    } else {
      const tmpBinLhs$3 /*:unknown*/ = $(7);
      const tmpIfTest$5 /*:boolean*/ = tmpBinLhs$3 === tmpSwitchValue;
      if (tmpIfTest$5) {
        tmpSwitchCaseToStart = 3;
      } else {
      }
    }
  }
}
const tmpIfTest$7 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$7) {
  $(2);
  $(undefined);
} else {
  const tmpIfTest$9 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$9) {
    $(3);
  } else {
  }
  const tmpIfTest$11 /*:boolean*/ = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$11) {
    $(5);
    const tmpReturnArg /*:unknown*/ = $(6);
    $(tmpReturnArg);
  } else {
    $(undefined);
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 4;
if (0 === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if ($(1) === tmpSwitchValue) {
    tmpSwitchCaseToStart = 1;
  } else {
    if ($(4) === tmpSwitchValue) {
      tmpSwitchCaseToStart = 2;
    } else {
      if ($(7) === tmpSwitchValue) {
        tmpSwitchCaseToStart = 3;
      }
    }
  }
}
if (tmpSwitchCaseToStart <= 0) {
  $(2);
  $(undefined);
} else {
  if (tmpSwitchCaseToStart <= 1) {
    $(3);
  }
  if (tmpSwitchCaseToStart <= 2) {
    $(5);
    $($(6));
  } else {
    $(undefined);
  }
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    const tmpSwitchValue = $(1);
    let tmpSwitchCaseToStart = 4;
    if (0 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
    else if ($(4) === tmpSwitchValue) tmpSwitchCaseToStart = 2;
    else if ($(7) === tmpSwitchValue) tmpSwitchCaseToStart = 3;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $(2);
        break tmpSwitchBreak;
      }
      if (tmpSwitchCaseToStart <= 1) {
        $(3);
      }
      if (tmpSwitchCaseToStart <= 2) {
        $(5);
        return $(6);
      }
      if (tmpSwitchCaseToStart <= 3) {
        break tmpSwitchBreak;
      }
    }
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 4;
  const tmpIfTest = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpBinLhs = $(1);
    const tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpBinLhs$1 = $(4);
      const tmpIfTest$3 = tmpBinLhs$1 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 2;
      } else {
        const tmpBinLhs$3 = $(7);
        const tmpIfTest$5 = tmpBinLhs$3 === tmpSwitchValue;
        if (tmpIfTest$5) {
          tmpSwitchCaseToStart = 3;
        } else {
        }
      }
    }
  }
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$7) {
    $(2);
    return undefined;
  } else {
    const tmpIfTest$9 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$9) {
      $(3);
    } else {
    }
    const tmpIfTest$11 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$11) {
      $(5);
      const tmpReturnArg = $(6);
      return tmpReturnArg;
    } else {
      const tmpIfTest$13 = tmpSwitchCaseToStart <= 3;
      return undefined;
    }
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = 4;
const c = 0 === a;
if (c) {
  b = 0;
}
else {
  const d = $( 1 );
  const e = d === a;
  if (e) {
    b = 1;
  }
  else {
    const f = $( 4 );
    const g = f === a;
    if (g) {
      b = 2;
    }
    else {
      const h = $( 7 );
      const i = h === a;
      if (i) {
        b = 3;
      }
    }
  }
}
const j = b <= 0;
if (j) {
  $( 2 );
  $( undefined );
}
else {
  const k = b <= 1;
  if (k) {
    $( 3 );
  }
  const l = b <= 2;
  if (l) {
    $( 5 );
    const m = $( 6 );
    $( m );
  }
  else {
    $( undefined );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: 5
 - 5: 6
 - 6: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
