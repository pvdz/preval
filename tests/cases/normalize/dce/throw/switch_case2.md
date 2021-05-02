# Preval test case

# switch_case2.md

> Normalize > Dce > Throw > Switch case2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      throw $(2, 'ret');
      $('fail');
  }
  $('keep, do not eval');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    const tmpSwitchValue = $(1, 'disc');
    let tmpSwitchCaseToStart = 1;
    if ($(1, 'case') === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        throw $(2, 'ret');
        $('fail');
      }
    }
  }
  $('keep, do not eval');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(1, 'case');
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
  }
  const tmpLabeledBlockFunc = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpBinLhs$3 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    const tmpIfTest$7 = tmpSwitchCaseToStart$3 <= 0;
    if (tmpIfTest$7) {
      const tmpThrowArg$1 = $(2, 'ret');
      throw tmpThrowArg$1;
    } else {
    }
    const tmpReturnArg = tmpAfterLabel(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$3, tmpIfTest$5);
    return tmpReturnArg;
  };
  const tmpAfterLabel = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$1 = $$0;
    let tmpSwitchCaseToStart$1 = $$1;
    let tmpBinLhs$1 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    $('keep, do not eval');
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
const tmpSwitchValue = $(1, 'disc');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1, 'case');
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpSwitchCaseToStart$3 = tmpSwitchCaseToStart;
const tmpIfTest$7 = tmpSwitchCaseToStart$3 <= 0;
if (tmpIfTest$7) {
  const tmpThrowArg$1 = $(2, 'ret');
  throw tmpThrowArg$1;
} else {
  $('keep, do not eval');
  $(undefined);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'disc'
 - 2: 1, 'case'
 - 3: 2, 'ret'
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
