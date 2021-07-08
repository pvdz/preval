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
  debugger;
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
  $(`after`);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
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
  const tmpLabeledBlockFunc = function ($$0, $$1, $$2) {
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpIfTest$17 = $$2;
    debugger;
    const tmpIfTest$19 = tmpSwitchCaseToStart$3 <= 0;
    if (tmpIfTest$19) {
      $(2);
      const tmpReturnArg$3 = tmpAfterLabel(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$17);
      return tmpReturnArg$3;
    } else {
      const tmpIfTest$21 = tmpSwitchCaseToStart$3 <= 1;
      if (tmpIfTest$21) {
        $(3);
      } else {
      }
      const tmpIfTest$23 = tmpSwitchCaseToStart$3 <= 2;
      if (tmpIfTest$23) {
        $(5);
        const tmpReturnArg$1 = $(6);
        return tmpReturnArg$1;
      } else {
        const tmpIfTest$25 = tmpSwitchCaseToStart$3 <= 3;
        if (tmpIfTest$25) {
          const tmpReturnArg$5 = tmpAfterLabel(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$17);
          return tmpReturnArg$5;
        } else {
          const tmpReturnArg$7 = tmpAfterLabel(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpIfTest$17);
          return tmpReturnArg$7;
        }
      }
    }
  };
  const tmpAfterLabel = function ($$0, $$1, $$2) {
    let tmpSwitchValue$1 = $$0;
    let tmpSwitchCaseToStart$1 = $$1;
    let tmpIfTest$15 = $$2;
    debugger;
    $(`after`);
    return undefined;
  };
  const tmpReturnArg$9 = tmpLabeledBlockFunc(tmpSwitchValue, tmpSwitchCaseToStart, tmpIfTest);
  return tmpReturnArg$9;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
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
let tmpReturnArg$9 = undefined;
const tmpSwitchCaseToStart$3 = tmpSwitchCaseToStart;
const tmpIfTest$19 = tmpSwitchCaseToStart$3 <= 0;
if (tmpIfTest$19) {
  $(2);
  $(`after`);
} else {
  const tmpIfTest$21 = tmpSwitchCaseToStart$3 <= 1;
  if (tmpIfTest$21) {
    $(3);
  } else {
  }
  const tmpIfTest$23 = tmpSwitchCaseToStart$3 <= 2;
  if (tmpIfTest$23) {
    $(5);
    const tmpReturnArg$1 = $(6);
    tmpReturnArg$9 = tmpReturnArg$1;
  } else {
    const tmpIfTest$25 = tmpSwitchCaseToStart$3 <= 3;
    if (tmpIfTest$25) {
      $(`after`);
    } else {
      $(`after`);
    }
  }
}
$(tmpReturnArg$9);
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
