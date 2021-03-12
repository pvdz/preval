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
  const tmpSwitchValue = $(1, 'disc');
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(1, 'case');
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const tmpReturnArg = $(2, 'ret');
    return tmpReturnArg;
  } else {
    $('keep, do not eval');
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
  const tmpBinLhs = $(1, 'case');
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const tmpReturnArg = $(2, 'ret');
    return tmpReturnArg;
  } else {
    $('keep, do not eval');
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
