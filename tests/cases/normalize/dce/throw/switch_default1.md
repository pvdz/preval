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

## Normalized

`````js filename=intro
function f() {
  const tmpSwitchTest = $(1, 'disc');
  const tmpSwitchValue = tmpSwitchTest;
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    $('keep, do not eval');
    throw 'wrong exig';
  }
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$2) {
    const tmpThrowArg = $(2, 'ret');
    throw tmpThrowArg;
  }
  $('fail');
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpSwitchTest = $(1, 'disc');
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchTest;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    $('keep, do not eval');
    throw 'wrong exig';
  }
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$2) {
    const tmpThrowArg = $(2, 'ret');
    throw tmpThrowArg;
  }
  $('fail');
}
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
 - eval returned: ('<crash[ 2 ]>')

Normalized calls: Same

Final output calls: Same
