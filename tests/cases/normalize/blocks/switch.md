# Preval test case

# switch.md

> Normalize > Blocks > Switch
>
> Add blocks to sub-statements. Let's do this for cases as well, for now. Maybe that's a mistake :)

#TODO

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

## Pre Normal


`````js filename=intro
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 5;
  if ($(2) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if ($(4) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else if ($(5) === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else if ($(6) === tmpSwitchValue) tmpSwitchCaseToStart = 3;
  else if ($(7) === tmpSwitchValue) tmpSwitchCaseToStart = 4;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(3);
    }
    if (tmpSwitchCaseToStart <= 1) {
    }
    if (tmpSwitchCaseToStart <= 2) {
    }
    if (tmpSwitchCaseToStart <= 3) {
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 4) {
    }
    if (tmpSwitchCaseToStart <= 5) {
    }
  }
}
`````

## Normalized


`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 5;
const tmpBinLhs = $(2);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
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
tmpSwitchBreak: {
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

## Output


`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 5;
const tmpBinLhs = $(2);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
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
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = 5;
const c = $( 2 );
const d = c === a;
if (d) {
  b = 0;
}
else {
  const e = $( 4 );
  const f = e === a;
  if (f) {
    b = 1;
  }
  else {
    const g = $( 5 );
    const h = g === a;
    if (h) {
      b = 2;
    }
    else {
      const i = $( 6 );
      const j = i === a;
      if (j) {
        b = 3;
      }
      else {
        const k = $( 7 );
        const l = k === a;
        if (l) {
          b = 4;
        }
      }
    }
  }
}
const m = b <= 0;
if (m) {
  $( 3 );
}
`````

## Globals

None

## Result

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

Final output calls: Same
