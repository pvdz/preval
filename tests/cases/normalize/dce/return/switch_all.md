# Preval test case

# switch_all.md

> Normalize > Dce > Return > Switch all
>
> Any statements that follow a return in the same parent should be eliminated.

If all switch cases return, including a default, then the code after a switch is dead code.

Simple case to check whether the switch transform doesn't prevent this.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      return;
      $('eliminate');
    case $(1):
      $('keep, eval');
      return;
      $('eliminate');
    default:
      $('keep, do not eval');
      return $(2, 'ret');
      $('eliminate');
  }
  $('eliminate after switch');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    const tmpSwitchValue = $(1, 'disc');
    let tmpSwitchCaseToStart = 2;
    if ($(0) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $('keep, do not eval');
        return;
        $('eliminate');
      }
      if (tmpSwitchCaseToStart <= 1) {
        $('keep, eval');
        return;
        $('eliminate');
      }
      if (tmpSwitchCaseToStart <= 2) {
        $('keep, do not eval');
        return $(2, 'ret');
        $('eliminate');
      }
    }
  }
  $('eliminate after switch');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpBranchingC = function () {
    $('eliminate after switch');
  };
  const tmpLabeledBlockFunc = function () {
    const tmpSwitchValue$1 = $(1, 'disc');
    let tmpSwitchCaseToStart$1 = 2;
    const tmpBinLhs$2 = $(0);
    const tmpIfTest$5 = tmpBinLhs$2 === tmpSwitchValue$1;
    if (tmpIfTest$5) {
      tmpSwitchCaseToStart$1 = 0;
    } else {
      const tmpBinLhs$3 = $(1);
      const tmpIfTest$7 = tmpBinLhs$3 === tmpSwitchValue$1;
      if (tmpIfTest$7) {
        tmpSwitchCaseToStart$1 = 1;
      }
    }
    const tmpIfTest$6 = tmpSwitchCaseToStart$1 <= 0;
    if (tmpIfTest$6) {
      $('keep, do not eval');
      return undefined;
    } else {
      const tmpIfTest$8 = tmpSwitchCaseToStart$1 <= 1;
      if (tmpIfTest$8) {
        $('keep, eval');
        return undefined;
      } else {
        const tmpIfTest$9 = tmpSwitchCaseToStart$1 <= 2;
        if (tmpIfTest$9) {
          $('keep, do not eval');
          const tmpReturnArg$1 = $(2, 'ret');
          return tmpReturnArg$1;
        } else {
          const tmpReturnArg$2 = tmpBranchingC();
          return tmpReturnArg$2;
        }
      }
    }
  };
  const tmpReturnArg$3 = tmpLabeledBlockFunc();
  return tmpReturnArg$3;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpLabeledBlockFunc = function () {
  const tmpSwitchValue$1 = $(1, 'disc');
  let tmpSwitchCaseToStart$1 = 2;
  const tmpBinLhs$2 = $(0);
  const tmpIfTest$5 = tmpBinLhs$2 === tmpSwitchValue$1;
  if (tmpIfTest$5) {
    tmpSwitchCaseToStart$1 = 0;
  } else {
    const tmpBinLhs$3 = $(1);
    const tmpIfTest$7 = tmpBinLhs$3 === tmpSwitchValue$1;
    if (tmpIfTest$7) {
      tmpSwitchCaseToStart$1 = 1;
    }
  }
  const tmpIfTest$6 = tmpSwitchCaseToStart$1 <= 0;
  if (tmpIfTest$6) {
    $('keep, do not eval');
    return undefined;
  } else {
    const tmpIfTest$8 = tmpSwitchCaseToStart$1 <= 1;
    if (tmpIfTest$8) {
      $('keep, eval');
      return undefined;
    } else {
      const tmpIfTest$9 = tmpSwitchCaseToStart$1 <= 2;
      if (tmpIfTest$9) {
        $('keep, do not eval');
        const tmpReturnArg$1 = $(2, 'ret');
        return tmpReturnArg$1;
      } else {
        $('eliminate after switch');
        return undefined;
      }
    }
  }
};
const tmpReturnArg$3 = tmpLabeledBlockFunc();
$(tmpReturnArg$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'disc'
 - 2: 0
 - 3: 1
 - 4: 'keep, eval'
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
