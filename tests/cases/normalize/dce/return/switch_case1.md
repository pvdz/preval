# Preval test case

# switch_case1.md

> Normalize > Dce > Return > Switch case1
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1, 'disc')) {
    case $(1, 'case'):
      return $(2, 'ret');
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
      return $(2, `ret`);
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
      const tmpReturnArg$1 = $(2, `ret`);
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$3 = tmpAfterLabel();
      return tmpReturnArg$3;
    }
  };
  const tmpAfterLabel = function () {
    debugger;
    $(`keep, do not eval`);
    return undefined;
  };
  const tmpReturnArg$5 = tmpLabeledBlockFunc();
  return tmpReturnArg$5;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpLabeledBlockFunc = function () {
  debugger;
  const tmpSwitchDisc$1 = $(1, `disc`);
  const tmpBinBothRhs$1 = $(1, `case`);
  const tmpIfTest$1 = tmpSwitchDisc$1 === tmpBinBothRhs$1;
  if (tmpIfTest$1) {
    const tmpReturnArg$1 = $(2, `ret`);
    return tmpReturnArg$1;
  } else {
    $(`keep, do not eval`);
    return undefined;
  }
};
const tmpReturnArg$5 = tmpLabeledBlockFunc();
$(tmpReturnArg$5);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1, "disc" );
  const c = $( 1, "case" );
  const d = b === c;
  if (d) {
    const e = $( 2, "ret" );
    return e;
  }
  else {
    $( "keep, do not eval" );
    return undefined;
  }
},;
const f = a();
$( f );
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
