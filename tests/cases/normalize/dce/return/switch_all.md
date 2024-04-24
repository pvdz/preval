# Preval test case

# switch_all.md

> Normalize > Dce > Return > Switch all
>
> Any statements that follow a return in the same parent should be eliminated.

If all switch cases return, including a default, then the code after a switch is dead code.

Simple case to check whether the switch transform doesn't prevent this.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      return;
      $('eliminate');
    case $(1):
      $('keep, eval');
      return;
      $('eliminate');
    default:
      $('keep, do not eval');
      return $(2, 'ret');
      $('eliminate');
  }
  $('eliminate after switch');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    const tmpSwitchValue = $(1, `disc`);
    let tmpSwitchCaseToStart = 2;
    if ($(0) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $(`keep, do not eval`);
        return;
        $(`eliminate`);
      }
      if (tmpSwitchCaseToStart <= 1) {
        $(`keep, eval`);
        return;
        $(`eliminate`);
      }
      if (tmpSwitchCaseToStart <= 2) {
        $(`keep, do not eval`);
        return $(2, `ret`);
        $(`eliminate`);
      }
    }
  }
  $(`eliminate after switch`);
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
    let tmpBinLhs$3 = $$2;
    let tmpIfTest$9 = $$3;
    debugger;
    $(`eliminate after switch`);
    return undefined;
  };
  const tmpSwitchValue = $(1, `disc`);
  let tmpSwitchCaseToStart = 2;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpBinLhs$1 = $(1);
    const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
    }
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    $(`keep, do not eval`);
    return undefined;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$5) {
      $(`keep, eval`);
      return undefined;
    } else {
      const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
      if (tmpIfTest$7) {
        $(`keep, do not eval`);
        const tmpReturnArg = $(2, `ret`);
        return tmpReturnArg;
      } else {
        const tmpReturnArg$1 = tmpAfterLabel(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
        return tmpReturnArg$1;
      }
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
  let tmpSwitchCaseToStart = 2;
  const tmpBinLhs = $(0);
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpBinLhs$1 = $(1);
    const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
    }
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    $(`keep, do not eval`);
    return undefined;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$5) {
      $(`keep, eval`);
      return undefined;
    } else {
      $(`keep, do not eval`);
      const tmpReturnArg = $(2, `ret`);
      return tmpReturnArg;
    }
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
  let c = 2;
  const d = $( 0 );
  const e = d === b;
  if (e) {
    c = 0;
  }
  else {
    const f = $( 1 );
    const g = f === b;
    if (g) {
      c = 1;
    }
  }
  const h = c <= 0;
  if (h) {
    $( "keep, do not eval" );
    return undefined;
  }
  else {
    const i = c <= 1;
    if (i) {
      $( "keep, eval" );
      return undefined;
    }
    else {
      $( "keep, do not eval" );
      const j = $( 2, "ret" );
      return j;
    }
  }
};
const k = a();
$( k );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'disc'
 - 2: 0
 - 3: 1
 - 4: 'keep, eval'
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
