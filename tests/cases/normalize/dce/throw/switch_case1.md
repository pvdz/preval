# Preval test case

# switch_case1.md

> Normalize > Dce > Throw > Switch case1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      throw $(2, 'ret');
  }
  $('keep, do not eval');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    const tmpSwitchValue = $(1, 'disc');
    let tmpSwitchCaseToStart = 1;
    if ($(1, 'case') === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        throw $(2, 'ret');
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
  const tmpBranchingC = function () {
    $('keep, do not eval');
  };
  const tmpLabeledBlockFunc = function () {
    const tmpSwitchValue$1 = $(1, 'disc');
    let tmpSwitchCaseToStart$1 = 1;
    const tmpBinLhs$1 = $(1, 'case');
    const tmpIfTest$2 = tmpBinLhs$1 === tmpSwitchValue$1;
    if (tmpIfTest$2) {
      tmpSwitchCaseToStart$1 = 0;
    }
    const tmpIfTest$3 = tmpSwitchCaseToStart$1 <= 0;
    if (tmpIfTest$3) {
      const tmpThrowArg$1 = $(2, 'ret');
      throw tmpThrowArg$1;
    } else {
      const tmpReturnArg = tmpBranchingC();
      return tmpReturnArg;
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
const f = function () {
  const tmpSwitchValue$1 = $(1, 'disc');
  let tmpSwitchCaseToStart$1 = 1;
  const tmpBinLhs$1 = $(1, 'case');
  const tmpIfTest$2 = tmpBinLhs$1 === tmpSwitchValue$1;
  if (tmpIfTest$2) {
    tmpSwitchCaseToStart$1 = 0;
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart$1 <= 0;
  if (tmpIfTest$3) {
    const tmpThrowArg$1 = $(2, 'ret');
    throw tmpThrowArg$1;
  } else {
    $('keep, do not eval');
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
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
