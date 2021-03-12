# Preval test case

# early_return_with_tail.md

> Normalize > Switch > Early return with tail
>
> Sorting out the branching stuff

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(7)) {
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
  $('after');
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpSwitchValue = $(7);
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
    } else {
      const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
      if (tmpIfTest$5) {
        $(3);
      }
      const tmpIfTest$6 = tmpSwitchCaseToStart <= 2;
      if (tmpIfTest$6) {
        $(5);
        const tmpReturnArg = $(6);
        return tmpReturnArg;
      } else {
        const tmpIfTest$7 = tmpSwitchCaseToStart <= 3;
        if (tmpIfTest$7) {
          break tmpSwitchBreak;
        }
      }
    }
  }
  $('after');
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpSwitchValue = $(7);
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
    } else {
      const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
      if (tmpIfTest$5) {
        $(3);
      }
      const tmpIfTest$6 = tmpSwitchCaseToStart <= 2;
      if (tmpIfTest$6) {
        $(5);
        const tmpReturnArg = $(6);
        return tmpReturnArg;
      } else {
        const tmpIfTest$7 = tmpSwitchCaseToStart <= 3;
        if (tmpIfTest$7) {
          break tmpSwitchBreak;
        }
      }
    }
  }
  $('after');
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 7
 - 2: 1
 - 3: 4
 - 4: 7
 - 5: 'after'
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same