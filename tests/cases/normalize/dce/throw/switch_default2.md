# Preval test case

# switch_default2.md

> Normalize > Dce > Throw > Switch default2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('keep, do not eval');
      throw 'wrong exit';
    default:
      throw $(2, 'ret');
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
        throw `wrong exit`;
      }
      if (tmpSwitchCaseToStart <= 1) {
        throw $(2, `ret`);
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
    throw `wrong exit`;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      const tmpThrowArg = $(2, `ret`);
      throw tmpThrowArg;
    } else {
      const tmpReturnArg = tmpAfterLabel(tmpSwitchValue, tmpSwitchCaseToStart, tmpBinLhs, tmpIfTest);
      return tmpReturnArg;
    }
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
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
  throw `wrong exit`;
} else {
  const tmpThrowArg = $(2, `ret`);
  throw tmpThrowArg;
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1, "disc" );
let b = 1;
const c = $( 0 );
let d = true;
const e = c === a;
if (e) {
  b = 0;
}
else {
  d = b <= 0;
}
if (d) {
  $( "keep, do not eval" );
  throw "wrong exit";
}
else {
  const f = $( 2, "ret" );
  throw f;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'disc'
 - 2: 0
 - 3: 2, 'ret'
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
