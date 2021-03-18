# Preval test case

# switch_default2.md

> Normalize > Dce > Return > Switch default2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      return;
    default:
      return $(2, 'ret');
      $('fail');
  }
  $('fail');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    const tmpSwitchValue = $(1, 'disc');
    let tmpSwitchCaseToStart = 1;
    if ($(0) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $('keep, do not eval');
        return;
      }
      if (tmpSwitchCaseToStart <= 1) {
        return $(2, 'ret');
        $('fail');
      }
    }
  }
  $('fail');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpBranchingC = function () {
    $('fail');
  };
  const tmpLabeledBlockFunc = function () {
    const tmpSwitchValue$1 = $(1, 'disc');
    let tmpSwitchCaseToStart$1 = 1;
    const tmpBinLhs$1 = $(0);
    const tmpIfTest$3 = tmpBinLhs$1 === tmpSwitchValue$1;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart$1 = 0;
    }
    const tmpIfTest$4 = tmpSwitchCaseToStart$1 <= 0;
    if (tmpIfTest$4) {
      $('keep, do not eval');
      return undefined;
    } else {
      const tmpIfTest$5 = tmpSwitchCaseToStart$1 <= 1;
      if (tmpIfTest$5) {
        const tmpReturnArg$1 = $(2, 'ret');
        return tmpReturnArg$1;
      } else {
        const tmpReturnArg$2 = tmpBranchingC();
        return tmpReturnArg$2;
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
  let tmpSwitchCaseToStart$1 = 1;
  const tmpBinLhs$1 = $(0);
  const tmpIfTest$3 = tmpBinLhs$1 === tmpSwitchValue$1;
  if (tmpIfTest$3) {
    tmpSwitchCaseToStart$1 = 0;
  }
  const tmpIfTest$4 = tmpSwitchCaseToStart$1 <= 0;
  if (tmpIfTest$4) {
    $('keep, do not eval');
    return undefined;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart$1 <= 1;
    if (tmpIfTest$5) {
      const tmpReturnArg$1 = $(2, 'ret');
      return tmpReturnArg$1;
    } else {
      $('fail');
      return undefined;
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
 - 3: 2, 'ret'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
