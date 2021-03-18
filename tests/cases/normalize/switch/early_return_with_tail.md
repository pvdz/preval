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

## Pre Normal

`````js filename=intro
let f = function () {
  {
    const tmpSwitchValue = $(7);
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
  $('after');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpBranchingC = function () {
    $('after');
  };
  const tmpLabeledBlockFunc = function () {
    const tmpSwitchValue$1 = $(7);
    let tmpSwitchCaseToStart$1 = 4;
    const tmpIfTest$8 = 0 === tmpSwitchValue$1;
    if (tmpIfTest$8) {
      tmpSwitchCaseToStart$1 = 0;
    } else {
      const tmpBinLhs$3 = $(1);
      const tmpIfTest$10 = tmpBinLhs$3 === tmpSwitchValue$1;
      if (tmpIfTest$10) {
        tmpSwitchCaseToStart$1 = 1;
      } else {
        const tmpBinLhs$4 = $(4);
        const tmpIfTest$11 = tmpBinLhs$4 === tmpSwitchValue$1;
        if (tmpIfTest$11) {
          tmpSwitchCaseToStart$1 = 2;
        } else {
          const tmpBinLhs$5 = $(7);
          const tmpIfTest$12 = tmpBinLhs$5 === tmpSwitchValue$1;
          if (tmpIfTest$12) {
            tmpSwitchCaseToStart$1 = 3;
          }
        }
      }
    }
    const tmpIfTest$9 = tmpSwitchCaseToStart$1 <= 0;
    if (tmpIfTest$9) {
      $(2);
      const tmpReturnArg$2 = tmpBranchingC();
      return tmpReturnArg$2;
    } else {
      const tmpIfTest$13 = tmpSwitchCaseToStart$1 <= 1;
      if (tmpIfTest$13) {
        $(3);
      }
      const tmpIfTest$14 = tmpSwitchCaseToStart$1 <= 2;
      if (tmpIfTest$14) {
        $(5);
        const tmpReturnArg$1 = $(6);
        return tmpReturnArg$1;
      } else {
        const tmpIfTest$15 = tmpSwitchCaseToStart$1 <= 3;
        if (tmpIfTest$15) {
          const tmpReturnArg$3 = tmpBranchingC();
          return tmpReturnArg$3;
        } else {
          const tmpReturnArg$4 = tmpBranchingC();
          return tmpReturnArg$4;
        }
      }
    }
  };
  const tmpReturnArg$5 = tmpLabeledBlockFunc();
  return tmpReturnArg$5;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpLabeledBlockFunc = function () {
  const tmpSwitchValue$1 = $(7);
  let tmpSwitchCaseToStart$1 = 4;
  const tmpIfTest$8 = 0 === tmpSwitchValue$1;
  if (tmpIfTest$8) {
    tmpSwitchCaseToStart$1 = 0;
  } else {
    const tmpBinLhs$3 = $(1);
    const tmpIfTest$10 = tmpBinLhs$3 === tmpSwitchValue$1;
    if (tmpIfTest$10) {
      tmpSwitchCaseToStart$1 = 1;
    } else {
      const tmpBinLhs$4 = $(4);
      const tmpIfTest$11 = tmpBinLhs$4 === tmpSwitchValue$1;
      if (tmpIfTest$11) {
        tmpSwitchCaseToStart$1 = 2;
      } else {
        const tmpBinLhs$5 = $(7);
        const tmpIfTest$12 = tmpBinLhs$5 === tmpSwitchValue$1;
        if (tmpIfTest$12) {
          tmpSwitchCaseToStart$1 = 3;
        }
      }
    }
  }
  const tmpIfTest$9 = tmpSwitchCaseToStart$1 <= 0;
  if (tmpIfTest$9) {
    $(2);
    $('after');
    return undefined;
  } else {
    const tmpIfTest$13 = tmpSwitchCaseToStart$1 <= 1;
    if (tmpIfTest$13) {
      $(3);
    }
    const tmpIfTest$14 = tmpSwitchCaseToStart$1 <= 2;
    if (tmpIfTest$14) {
      $(5);
      const tmpReturnArg$1 = $(6);
      return tmpReturnArg$1;
    } else {
      const tmpIfTest$15 = tmpSwitchCaseToStart$1 <= 3;
      if (tmpIfTest$15) {
        $('after');
        return undefined;
      } else {
        $('after');
        return undefined;
      }
    }
  }
};
const tmpReturnArg$5 = tmpLabeledBlockFunc();
$(tmpReturnArg$5);
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
