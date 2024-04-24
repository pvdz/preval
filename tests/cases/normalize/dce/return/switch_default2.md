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
  debugger;
  {
    const tmpSwitchValue = $(1, `disc`);
    let tmpSwitchCaseToStart = 1;
    if ($(0) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $(`keep, do not eval`);
        return;
      }
      if (tmpSwitchCaseToStart <= 1) {
        return $(2, `ret`);
        $(`fail`);
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
  const tmpAfterLabel = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$1 = $$0;
    let tmpSwitchCaseToStart$1 = $$1;
    let tmpBinLhs$1 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    $(`fail`);
    return undefined;
  };
  const tmpSwitchValue = $(1, `disc`);
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
  }
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    $(`keep, do not eval`);
    return undefined;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      const tmpReturnArg = $(2, `ret`);
      return tmpReturnArg;
    } else {
      const tmpReturnArg$1 = tmpAfterLabel(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
      return tmpReturnArg$1;
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
  debugger;
  const tmpSwitchValue = $(1, `disc`);
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $(0);
  let tmpIfTest$1 = true;
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  }
  if (tmpIfTest$1) {
    $(`keep, do not eval`);
    return undefined;
  } else {
    const tmpReturnArg = $(2, `ret`);
    return tmpReturnArg;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1, "disc" );
  let c = 1;
  const d = $( 0 );
  let e = true;
  const f = d === b;
  if (f) {
    c = 0;
  }
  else {
    e = c <= 0;
  }
  if (e) {
    $( "keep, do not eval" );
    return undefined;
  }
  else {
    const g = $( 2, "ret" );
    return g;
  }
};
const h = a();
$( h );
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
