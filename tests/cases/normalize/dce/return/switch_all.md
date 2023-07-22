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
  const tmpLabeledBlockFunc = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$3 = $$0;
    let tmpSwitchCaseToStart$3 = $$1;
    let tmpBinLhs$5 = $$2;
    let tmpIfTest$11 = $$3;
    debugger;
    const tmpIfTest$13 = tmpSwitchCaseToStart$3 <= 0;
    if (tmpIfTest$13) {
      $(`keep, do not eval`);
      return undefined;
    } else {
      const tmpIfTest$15 = tmpSwitchCaseToStart$3 <= 1;
      if (tmpIfTest$15) {
        $(`keep, eval`);
        return undefined;
      } else {
        const tmpIfTest$17 = tmpSwitchCaseToStart$3 <= 2;
        if (tmpIfTest$17) {
          $(`keep, do not eval`);
          const tmpReturnArg$1 = $(2, `ret`);
          return tmpReturnArg$1;
        } else {
          const tmpReturnArg$3 = tmpAfterLabel(tmpSwitchValue$3, tmpSwitchCaseToStart$3, tmpBinLhs$5, tmpIfTest$11);
          return tmpReturnArg$3;
        }
      }
    }
  };
  const tmpAfterLabel = function ($$0, $$1, $$2, $$3) {
    let tmpSwitchValue$1 = $$0;
    let tmpSwitchCaseToStart$1 = $$1;
    let tmpBinLhs$3 = $$2;
    let tmpIfTest$9 = $$3;
    debugger;
    $(`eliminate after switch`);
    return undefined;
  };
  const tmpReturnArg$5 = tmpLabeledBlockFunc(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
  return tmpReturnArg$5;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
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
const tmpLabeledBlockFunc = function ($$0, $$1) {
  const tmpSwitchCaseToStart$3 = $$0;
  const tmpOutlinedParam = $$1;
  debugger;
  if (tmpOutlinedParam) {
    $(`keep, do not eval`);
    return undefined;
  } else {
    const tmpIfTest$15 = tmpSwitchCaseToStart$3 <= 1;
    if (tmpIfTest$15) {
      $(`keep, eval`);
      return undefined;
    } else {
      const tmpIfTest$17 = tmpSwitchCaseToStart$3 <= 2;
      if (tmpIfTest$17) {
        $(`keep, do not eval`);
        const tmpReturnArg$1 = $(2, `ret`);
        return tmpReturnArg$1;
      } else {
        $(`eliminate after switch`);
        return undefined;
      }
    }
  }
};
const tmpSaooB = tmpSwitchCaseToStart <= 0;
const tmpReturnArg$5 = tmpLabeledBlockFunc(tmpSwitchCaseToStart, tmpSaooB);
$(tmpReturnArg$5);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1, "disc" );
let b = 2;
const c = $( 0 );
const d = c === a;
if (d) {
  b = 0;
}
else {
  const e = $( 1 );
  const f = e === a;
  if (f) {
    b = 1;
  }
}
const g = function($$0,$$1 ) {
  const h = i;
  const j = k;
  debugger;
  if (j) {
    $( "keep, do not eval" );
    return undefined;
  }
  else {
    const l = h <= 1;
    if (l) {
      $( "keep, eval" );
      return undefined;
    }
    else {
      const m = h <= 2;
      if (m) {
        $( "keep, do not eval" );
        const n = $( 2, "ret" );
        return n;
      }
      else {
        $( "eliminate after switch" );
        return undefined;
      }
    }
  }
};
const o = b <= 0;
const p = g( b, o );
$( p );
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
