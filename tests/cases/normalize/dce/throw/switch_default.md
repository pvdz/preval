# Preval test case

# switch_default.md

> Normalize > Dce > Throw > Switch default
>
> Any statements that follow a return in the same parent should be eliminated.

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
  tmpSwitchBreak: {
    const tmpSwitchDisc = $(1, `disc`);
    if (tmpSwitchDisc === $(0)) {
      $(`wrong branch`);
      throw `wrong exit`;
    } else if (true) {
      throw $(2, `throw`);
      $(`fail`);
    } else {
    }
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchDisc = $(1, `disc`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(0);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    $(`wrong branch`);
    throw `wrong exit`;
  } else {
    const tmpThrowArg = $(2, `throw`);
    throw tmpThrowArg;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(1, `disc`);
const tmpBinBothRhs /*:unknown*/ = $(0);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(`wrong branch`);
  throw `wrong exit`;
} else {
  const tmpThrowArg /*:unknown*/ = $(2, `throw`);
  throw tmpThrowArg;
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1, "disc" );
const b = $( 0 );
const c = a === b;
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
