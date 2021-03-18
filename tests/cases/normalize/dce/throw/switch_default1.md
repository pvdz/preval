# Preval test case

# switch_default1.md

> Normalize > Dce > Throw > Switch default1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      throw 'wrong exig';
    default:
      throw $(2, 'ret');
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
        throw 'wrong exig';
      }
      if (tmpSwitchCaseToStart <= 1) {
        throw $(2, 'ret');
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
      throw 'wrong exig';
    } else {
      const tmpIfTest$5 = tmpSwitchCaseToStart$1 <= 1;
      if (tmpIfTest$5) {
        const tmpThrowArg$1 = $(2, 'ret');
        throw tmpThrowArg$1;
      } else {
        const tmpReturnArg = tmpBranchingC();
        return tmpReturnArg;
      }
    }
  };
  const tmpReturnArg$1 = tmpLabeledBlockFunc();
  return tmpReturnArg$1;
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
    throw 'wrong exig';
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart$1 <= 1;
    if (tmpIfTest$5) {
      const tmpThrowArg$1 = $(2, 'ret');
      throw tmpThrowArg$1;
    } else {
      $('fail');
      return undefined;
    }
  }
};
const tmpReturnArg$1 = tmpLabeledBlockFunc();
$(tmpReturnArg$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'disc'
 - 2: 0
 - 3: 2, 'ret'
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
