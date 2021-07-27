# Preval test case

# default_middle.md

> Normalize > Switch > Default middle
>
> Normalize switches

The problem at hand is that default is allowed to jump back.

The input below should call $ with 10, 20, 30, 40, 50, and then 'd', 3, and 4. 

More complex cases are possible, where breaks happen at arbitrary points rather than top level. Send help.

I think it's "okay" to take the remaining cases and duplicate their consequent statements as the body of the default. Best case that's an empty list when the default is the last case, worst case it makes the rare situation where this occurs anyways, work in a less efficient way. At least it should still work... But some problems may arise, I dunno.

```js
let x = 6;
let def = false
let fall = false;
// Either a case breaks explicitly, in which case the test is moot
// Or, a case falls through and never breaks, then the test halts
// Or, the default is hit, which will always set fall, so the test halts
while(fall === false) {
  if (def) {
    // The default case only has a `fall` check
    // That's because the case that preceeds it may fall through to it
    fall = true;
  } else {
    // These are the cases that preceded the default case
    if (x === $(10)) {
      $(1);
      break;
    }
    if (fall || x === $(20)) {
      $(1);
      fall = true; // this one will fall through to the default case
    }
  }
  if (fall) { // default case, no other condition
    $('d');
    fall = true;
  }
  if (fall || x === $(40)) {
    $(4);
    fall = true;
  }
  if (fall || x === $(50)) {
    $(5);
    break;
  }
 
  def = true; // No case was hit so repeat from the top but invoke the default case this time
}
```

#TODO

## Input

`````js filename=intro
switch (6) {
  case $(10): $(1); break;
  case $(20): $(2);
  default: $('d');
  case $(30): $(3);
  case $(40): $(4); break;
  case $(50): $(5); break;
}
`````

## Pre Normal

`````js filename=intro
{
  const tmpSwitchValue = 6;
  let tmpSwitchCaseToStart = 2;
  if ($(10) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if ($(20) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else if ($(30) === tmpSwitchValue) tmpSwitchCaseToStart = 3;
  else if ($(40) === tmpSwitchValue) tmpSwitchCaseToStart = 4;
  else if ($(50) === tmpSwitchValue) tmpSwitchCaseToStart = 5;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(1);
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(2);
    }
    if (tmpSwitchCaseToStart <= 2) {
      $(`d`);
    }
    if (tmpSwitchCaseToStart <= 3) {
      $(3);
    }
    if (tmpSwitchCaseToStart <= 4) {
      $(4);
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 5) {
      $(5);
      break tmpSwitchBreak;
    }
  }
}
`````

## Normalized

`````js filename=intro
const tmpSwitchValue = 6;
let tmpSwitchCaseToStart = 2;
const tmpBinLhs = $(10);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
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
      tmpSwitchCaseToStart = 3;
    } else {
      const tmpBinLhs$5 = $(40);
      const tmpIfTest$5 = tmpBinLhs$5 === tmpSwitchValue;
      if (tmpIfTest$5) {
        tmpSwitchCaseToStart = 4;
      } else {
        const tmpBinLhs$7 = $(50);
        const tmpIfTest$7 = tmpBinLhs$7 === tmpSwitchValue;
        if (tmpIfTest$7) {
          tmpSwitchCaseToStart = 5;
        } else {
        }
      }
    }
  }
}
tmpSwitchBreak: {
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
      $(`d`);
    } else {
    }
    const tmpIfTest$15 = tmpSwitchCaseToStart <= 3;
    if (tmpIfTest$15) {
      $(3);
    } else {
    }
    const tmpIfTest$17 = tmpSwitchCaseToStart <= 4;
    if (tmpIfTest$17) {
      $(4);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$19 = tmpSwitchCaseToStart <= 5;
      if (tmpIfTest$19) {
        $(5);
        break tmpSwitchBreak;
      } else {
      }
    }
  }
}
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 2;
const tmpBinLhs = $(10);
const tmpIfTest = tmpBinLhs === 6;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(20);
  const tmpIfTest$1 = tmpBinLhs$1 === 6;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
    const tmpBinLhs$3 = $(30);
    const tmpIfTest$3 = tmpBinLhs$3 === 6;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 3;
    } else {
      const tmpBinLhs$5 = $(40);
      const tmpIfTest$5 = tmpBinLhs$5 === 6;
      if (tmpIfTest$5) {
        tmpSwitchCaseToStart = 4;
      } else {
        const tmpBinLhs$7 = $(50);
        const tmpIfTest$7 = tmpBinLhs$7 === 6;
        if (tmpIfTest$7) {
          tmpSwitchCaseToStart = 5;
        } else {
        }
      }
    }
  }
}
const tmpIfTest$9 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$9) {
  $(1);
} else {
  const tmpIfTest$11 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$11) {
    $(2);
  } else {
  }
  const tmpIfTest$13 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$13) {
    $(`d`);
  } else {
  }
  const tmpIfTest$15 = tmpSwitchCaseToStart <= 3;
  if (tmpIfTest$15) {
    $(3);
  } else {
  }
  const tmpIfTest$17 = tmpSwitchCaseToStart <= 4;
  if (tmpIfTest$17) {
    $(4);
  } else {
    $(5);
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 30
 - 4: 40
 - 5: 50
 - 6: 'd'
 - 7: 3
 - 8: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
