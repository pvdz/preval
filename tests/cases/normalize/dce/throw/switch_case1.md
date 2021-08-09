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
  debugger;
  tmpSwitchBreak: {
    const tmpSwitchDisc = $(1, `disc`);
    if (tmpSwitchDisc === $(1, `case`)) {
      throw $(2, `ret`);
    } else {
    }
  }
  $(`keep, do not eval`);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpLabeledBlockFunc = function () {
    debugger;
    const tmpSwitchDisc$1 = $(1, `disc`);
    const tmpBinBothLhs$1 = tmpSwitchDisc$1;
    const tmpBinBothRhs$1 = $(1, `case`);
    const tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    if (tmpIfTest$1) {
      const tmpThrowArg$1 = $(2, `ret`);
      throw tmpThrowArg$1;
    } else {
      const tmpReturnArg = tmpAfterLabel();
      return tmpReturnArg;
    }
  };
  const tmpAfterLabel = function () {
    debugger;
    $(`keep, do not eval`);
    return undefined;
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
const tmpSwitchDisc$1 = $(1, `disc`);
const tmpBinBothRhs$1 = $(1, `case`);
const tmpIfTest$1 = tmpSwitchDisc$1 === tmpBinBothRhs$1;
if (tmpIfTest$1) {
  const tmpThrowArg$1 = $(2, `ret`);
  throw tmpThrowArg$1;
} else {
  $(`keep, do not eval`);
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
