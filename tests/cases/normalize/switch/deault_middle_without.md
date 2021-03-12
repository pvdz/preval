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



#TODO

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

## Normalized

`````js filename=intro
const tmpSwitchValue = 6;
let tmpSwitchCaseToStart = 5;
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
    const tmpBinLhs$2 = $(30);
    const tmpIfTest$2 = tmpBinLhs$2 === tmpSwitchValue;
    if (tmpIfTest$2) {
      tmpSwitchCaseToStart = 2;
    } else {
      const tmpBinLhs$3 = $(40);
      const tmpIfTest$3 = tmpBinLhs$3 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 3;
      } else {
        const tmpBinLhs$4 = $(50);
        const tmpIfTest$4 = tmpBinLhs$4 === tmpSwitchValue;
        if (tmpIfTest$4) {
          tmpSwitchCaseToStart = 4;
        }
      }
    }
  }
}
tmpSwitchBreak: {
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$5) {
    $(1);
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$6 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$6) {
      $(2);
    }
    const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$7) {
      $(3);
    }
    const tmpIfTest$8 = tmpSwitchCaseToStart <= 3;
    if (tmpIfTest$8) {
      $(4);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$9 = tmpSwitchCaseToStart <= 4;
      if (tmpIfTest$9) {
        $(5);
        break tmpSwitchBreak;
      }
    }
  }
}
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 5;
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
    const tmpBinLhs$2 = $(30);
    const tmpIfTest$2 = tmpBinLhs$2 === 6;
    if (tmpIfTest$2) {
      tmpSwitchCaseToStart = 2;
    } else {
      const tmpBinLhs$3 = $(40);
      const tmpIfTest$3 = tmpBinLhs$3 === 6;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 3;
      } else {
        const tmpBinLhs$4 = $(50);
        const tmpIfTest$4 = tmpBinLhs$4 === 6;
        if (tmpIfTest$4) {
          tmpSwitchCaseToStart = 4;
        }
      }
    }
  }
}
tmpSwitchBreak: {
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$5) {
    $(1);
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$6 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$6) {
      $(2);
    }
    const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$7) {
      $(3);
    }
    const tmpIfTest$8 = tmpSwitchCaseToStart <= 3;
    if (tmpIfTest$8) {
      $(4);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$9 = tmpSwitchCaseToStart <= 4;
      if (tmpIfTest$9) {
        $(5);
        break tmpSwitchBreak;
      }
    }
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
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
