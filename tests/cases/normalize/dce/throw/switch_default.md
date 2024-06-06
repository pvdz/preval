# Preval test case

# switch_default.md

> Normalize > Dce > Throw > Switch default
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(0):
      $('wrong branch');
      throw 'wrong exit';
    default:
      throw $(2, 'throw');
      $('fail');
  }
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
        $(`wrong branch`);
        throw `wrong exit`;
      }
      if (tmpSwitchCaseToStart <= 1) {
        throw $(2, `throw`);
        $(`fail`);
      }
    }
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
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
    $(`wrong branch`);
    throw `wrong exit`;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      const tmpThrowArg = $(2, `throw`);
      throw tmpThrowArg;
    } else {
      return undefined;
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
const tmpBinLhs = $(0);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  $(`wrong branch`);
  throw `wrong exit`;
} else {
  const tmpThrowArg = $(2, `throw`);
  throw tmpThrowArg;
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1, "disc" );
const b = $( 0 );
const c = b === a;
if (c) {
  $( "wrong branch" );
  throw "wrong exit";
}
else {
  const d = $( 2, "throw" );
  throw d;
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'disc'
 - 2: 0
 - 3: 2, 'throw'
 - eval returned: ('<crash[ 2 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
