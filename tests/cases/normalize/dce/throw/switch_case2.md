# Preval test case

# switch_case2.md

> Normalize > Dce > Throw > Switch case2
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      throw $(2, 'ret');
      $('fail');
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
      $(`fail`);
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

## PST Output

With rename=true

`````js filename=intro
const a = $( 1, "disc" );
const b = $( 1, "case" );
const c = a === b;
if (c) {
  const d = $( 2, "ret" );
  throw d;
}
else {
  $( "keep, do not eval" );
  $( undefined );
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
