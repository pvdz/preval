# Preval test case

# switch_default1.md

> Normalize > Dce > Return > Switch default1
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
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    $('keep, do not eval');
    return undefined;
  } else {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$2) {
      const tmpReturnArg = $(2, 'ret');
      return tmpReturnArg;
    } else {
      $('fail');
    }
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    $('keep, do not eval');
    return undefined;
  } else {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$2) {
      const tmpReturnArg = $(2, 'ret');
      return tmpReturnArg;
    } else {
      $('fail');
    }
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
 - 2: 0
 - 3: 2, 'ret'
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
