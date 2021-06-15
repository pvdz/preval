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
  debugger;
  {
    const tmpSwitchValue = $(1, `disc`);
    let tmpSwitchCaseToStart = 1;
    if ($(0) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $(`keep, do not eval`);
        throw `wrong exig`;
      }
      if (tmpSwitchCaseToStart <= 1) {
        throw $(2, `ret`);
      }
    }
  }
  $(`fail`);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = $(1, `disc`);
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
  }
  const tmpLabeledBlockFunc = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpBinLhs$3 = $$2;
    let tmpIfTest$7 = $$3;
    debugger;
    const tmpIfTest$9 = tmpSwitchCaseToStart$3 <= 0;
    if (tmpIfTest$9) {
      $(`keep, do not eval`);
      throw `wrong exig`;
    } else {
      const tmpIfTest$11 = tmpSwitchCaseToStart$3 <= 1;
      if (tmpIfTest$11) {
        const tmpThrowArg$1 = $(2, `ret`);
        throw tmpThrowArg$1;
      } else {
        const tmpReturnArg = tmpAfterLabel(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$3, tmpIfTest$7);
        return tmpReturnArg;
      }
    }
  };
  const tmpAfterLabel = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$1 = $$0;
    let tmpSwitchCaseToStart$1 = $$1;
    let tmpBinLhs$1 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    $(`fail`);
    return undefined;
  };
  const tmpReturnArg$1 = tmpLabeledBlockFunc(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
  return tmpReturnArg$1;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpSwitchValue = $(1, `disc`);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(0);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpSwitchCaseToStart$3 = tmpSwitchCaseToStart;
const tmpIfTest$9 = tmpSwitchCaseToStart$3 <= 0;
if (tmpIfTest$9) {
  $(`keep, do not eval`);
  throw `wrong exig`;
} else {
  const tmpIfTest$11 = tmpSwitchCaseToStart$3 <= 1;
  if (tmpIfTest$11) {
    const tmpThrowArg$1 = $(2, `ret`);
    throw tmpThrowArg$1;
  } else {
    $(`fail`);
    $(undefined);
  }
}
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
