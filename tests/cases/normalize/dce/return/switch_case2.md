# Preval test case

# switch_case2.md

> Normalize > Dce > Return > Switch case2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      return $(2, 'ret');
      $('fail');
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
        return $(2, 'ret');
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
      const tmpReturnArg$1 = $(2, 'ret');
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$2 = tmpBranchingC();
      return tmpReturnArg$2;
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
    const tmpReturnArg$1 = $(2, 'ret');
    return tmpReturnArg$1;
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
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
