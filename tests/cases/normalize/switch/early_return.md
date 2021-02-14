# Preval test case

# early_return.md

> normalize > switch > early_return
>
> Sorting out the branching stuff

#TODO

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

## Normalized

`````js filename=intro
function f() {
  const tmpSwitchTest = $(1);
  const tmpSwitchValue = tmpSwitchTest;
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
      const tmpIfTest$2 = tmpBinLhs$1 === tmpSwitchValue;
      if (tmpIfTest$2) {
        tmpSwitchCaseToStart = 2;
      } else {
        const tmpBinLhs$2 = $(7);
        const tmpIfTest$3 = tmpBinLhs$2 === tmpSwitchValue;
        if (tmpIfTest$3) {
          tmpSwitchCaseToStart = 3;
        }
      }
    }
  }
  tmpSwitchBreak: {
    const tmpIfTest$4 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$4) {
      $(2);
      break tmpSwitchBreak;
    }
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$5) {
      $(3);
    }
    const tmpIfTest$6 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$6) {
      $(5);
      const tmpReturnArg = $(6);
      return tmpReturnArg;
    }
    const tmpIfTest$7 = tmpSwitchCaseToStart <= 3;
    if (tmpIfTest$7) {
      break tmpSwitchBreak;
    }
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpSwitchTest = $(1);
  let tmpSwitchCaseToStart = 4;
  const tmpIfTest = 0 === tmpSwitchTest;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpBinLhs = $(1);
    const tmpIfTest$1 = tmpBinLhs === tmpSwitchTest;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpBinLhs$1 = $(4);
      const tmpIfTest$2 = tmpBinLhs$1 === tmpSwitchTest;
      if (tmpIfTest$2) {
        tmpSwitchCaseToStart = 2;
      } else {
        const tmpBinLhs$2 = $(7);
        const tmpIfTest$3 = tmpBinLhs$2 === tmpSwitchTest;
        if (tmpIfTest$3) {
          tmpSwitchCaseToStart = 3;
        }
      }
    }
  }
  tmpSwitchBreak: {
    const tmpIfTest$4 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$4) {
      $(2);
      break tmpSwitchBreak;
    }
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$5) {
      $(3);
    }
    const tmpIfTest$6 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$6) {
      $(5);
      const tmpReturnArg = $(6);
      return tmpReturnArg;
    }
    const tmpIfTest$7 = tmpSwitchCaseToStart <= 3;
    if (tmpIfTest$7) {
      break tmpSwitchBreak;
    }
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: 5
 - 5: 6
 - 6: 6
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
