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
  const tmpAfterLabel = function () {
    debugger;
    $(`keep, do not eval`);
    return undefined;
  };
  const tmpSwitchDisc = $(1, `disc`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(1, `case`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    const tmpReturnArg = $(2, `ret`);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = tmpAfterLabel();
    return tmpReturnArg$1;
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
  const tmpSwitchDisc = $(1, `disc`);
  const tmpBinBothRhs = $(1, `case`);
  const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
  if (tmpIfTest) {
    const tmpReturnArg = $(2, `ret`);
    return tmpReturnArg;
  } else {
    $(`keep, do not eval`);
    return undefined;
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
};
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
